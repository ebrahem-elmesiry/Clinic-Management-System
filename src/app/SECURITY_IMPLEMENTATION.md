# Patient Data Privacy & Security Implementation

## Overview
This document explains how the Patient Dashboard implements secure, patient-specific data access with proper authentication and authorization controls.

## Authentication Flow

### 1. Patient Authentication
When a patient logs in, the system should:
- Verify credentials (email/password)
- Generate a secure session token/JWT
- Store the patient's unique ID in the session
- Return the authenticated patient ID to the frontend

```typescript
// Example login response
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "patient_12345",
    role: "patient",
    name: "John Doe",
    email: "john.doe@email.com"
  }
}
```

### 2. Token-Based Authorization
All API requests must include the authentication token:
```typescript
headers: {
  'Authorization': 'Bearer ' + token
}
```

## Data Access Control

### Server-Side Filtering (CRITICAL)
**All patient data queries MUST be filtered by the authenticated patient's ID on the server side.**

### API Endpoints Examples

#### ✅ CORRECT - Server filters by authenticated patient ID
```typescript
// Patient Dashboard Data
GET /api/patients/me
Headers: { Authorization: Bearer <token> }
// Server extracts patient ID from token
// Returns ONLY the authenticated patient's data

GET /api/appointments?patientId={authenticatedPatientId}
// Server validates token
// Returns ONLY appointments for authenticated patient

GET /api/prescriptions?patientId={authenticatedPatientId}&status=active
// Server validates token and patient ID match
// Returns ONLY prescriptions for authenticated patient

GET /api/medical-history?patientId={authenticatedPatientId}
// Server ensures the token's patient ID matches the query
// Returns ONLY medical history for authenticated patient
```

#### ❌ INCORRECT - Client-side filtering (INSECURE)
```typescript
// DON'T DO THIS - Returns all patients!
GET /api/patients
// Client filters the list - INSECURE!

// DON'T DO THIS - No filtering!
GET /api/appointments
// Anyone can see all appointments - MAJOR SECURITY ISSUE!
```

## Security Best Practices

### 1. Token Validation
```typescript
// Server-side middleware
async function validatePatientAccess(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Ensure the requested patient ID matches the authenticated user
    if (req.params.patientId && req.params.patientId !== decoded.userId) {
      return res.status(403).json({ error: 'Forbidden - Access denied' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### 2. Database Queries with User Context
```typescript
// Example using Prisma ORM
async function getPatientAppointments(authenticatedPatientId: string) {
  return await prisma.appointment.findMany({
    where: {
      patientId: authenticatedPatientId, // ALWAYS filter by authenticated user
      status: 'upcoming'
    },
    include: {
      doctor: {
        select: {
          name: true,
          specialty: true
        }
      }
    }
  });
}
```

### 3. Row-Level Security (Database Level)
For PostgreSQL with Supabase:
```sql
-- Enable RLS on patient tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_history ENABLE ROW LEVEL SECURITY;

-- Policy: Patients can only see their own data
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Patients can view own appointments" ON appointments
  FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can view own prescriptions" ON prescriptions
  FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can view own medical history" ON medical_history
  FOR SELECT
  USING (auth.uid() = patient_id);
```

## Frontend Implementation

### Using React Context for Auth
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  role: 'patient' | 'doctor' | 'admin';
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load token from localStorage on mount
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### API Client with Authentication
```typescript
// utils/api.ts
import { useAuth } from '../contexts/AuthContext';

class ApiClient {
  private baseUrl = '/api';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Patient-specific methods
  async getMyProfile() {
    return this.request('/patients/me');
  }

  async getMyAppointments() {
    return this.request('/appointments/my-appointments');
  }

  async getMyPrescriptions() {
    return this.request('/prescriptions/my-prescriptions');
  }

  async getMyMedicalHistory() {
    return this.request('/medical-history/my-history');
  }
}

export const apiClient = new ApiClient();
```

### Using in Components
```typescript
// components/pages/PatientDashboard.tsx
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/api';

export default function PatientDashboard() {
  const { user, token } = useAuth();
  
  // Set token for API calls
  apiClient.setToken(token);

  // Fetch authenticated patient's data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => apiClient.getMyProfile(),
    enabled: !!user
  });

  const { data: appointments } = useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: () => apiClient.getMyAppointments(),
    enabled: !!user
  });

  const { data: prescriptions } = useQuery({
    queryKey: ['prescriptions', user?.id],
    queryFn: () => apiClient.getMyPrescriptions(),
    enabled: !!user
  });

  // Render dashboard with authenticated user's data
  return (
    <div>
      <h1>Welcome, {profile?.name}</h1>
      {/* Display patient-specific data */}
    </div>
  );
}
```

## Data Privacy Checklist

- [ ] All API endpoints validate authentication tokens
- [ ] Server-side queries filter by authenticated patient ID
- [ ] Database has row-level security policies
- [ ] No patient lists are exposed to patient role
- [ ] Tokens are securely stored (httpOnly cookies preferred)
- [ ] Tokens have expiration times
- [ ] Failed auth attempts are logged
- [ ] HTTPS is enforced in production
- [ ] CORS is properly configured
- [ ] Sensitive data is encrypted at rest
- [ ] Audit logs track data access
- [ ] Regular security audits are performed

## Error Handling

```typescript
// Proper error handling for unauthorized access
try {
  const data = await apiClient.getMyProfile();
} catch (error) {
  if (error.status === 401) {
    // Token expired or invalid - redirect to login
    logout();
    navigate('/login');
  } else if (error.status === 403) {
    // User doesn't have permission
    showError('Access denied');
  } else {
    // Other errors
    showError('Something went wrong');
  }
}
```

## Testing Security

### Unit Tests
```typescript
describe('Patient Data Access', () => {
  it('should only return data for authenticated patient', async () => {
    const patientId = 'patient_12345';
    const token = generateTestToken({ userId: patientId, role: 'patient' });
    
    const response = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.every(apt => apt.patientId === patientId)).toBe(true);
  });

  it('should reject access to other patient data', async () => {
    const patientId = 'patient_12345';
    const otherPatientId = 'patient_67890';
    const token = generateTestToken({ userId: patientId, role: 'patient' });
    
    const response = await request(app)
      .get(`/api/patients/${otherPatientId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(403);
  });
});
```

## Summary

The Patient Dashboard implements secure, patient-specific data access through:

1. **Authentication** - Token-based auth with JWT
2. **Authorization** - Server-side validation of patient ID
3. **Data Filtering** - All queries filtered by authenticated patient ID
4. **Database Security** - Row-level security policies
5. **Privacy** - No exposure of other patients' data
6. **Audit** - Logging and monitoring of data access

**Remember: Security is implemented on the SERVER side. Never trust the client!**
