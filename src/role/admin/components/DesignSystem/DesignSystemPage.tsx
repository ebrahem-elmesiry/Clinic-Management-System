"use client";

import React, { useState } from 'react';
import {
  Calendar, Users, DollarSign, Activity, Clock, CheckCircle,
  Bell, User, Search, Download, Printer, Plus, Trash2, Mail,
  Lock, Stethoscope, CreditCard, BarChart3, Settings, LogOut,
  AlertCircle, ChevronRight, UserCog, LayoutDashboard, ClipboardList,
  FileText, Menu, X, TrendingUp, Phone, MapPin, Receipt, XCircle
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Internal mini-components that mirror the actual app components exactly
───────────────────────────────────────────────────────────────────────────── */
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="mb-8 pb-4 border-b-2 border-blue-100">
        <h2 className="text-2xl text-gray-900 mb-1">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-base text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-mono text-gray-600">{name}</span>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TABS
───────────────────────────────────────────────────────────────────────────── */
const TABS = ['Design Tokens', 'Components', 'Pages Overview'] as const;
type Tab = typeof TABS[number];

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Design Tokens');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 px-8 py-10 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-white mb-1">HealthCare — Design System</h1>
            <p className="text-blue-100">Clinic Management System · UI/UX Specification</p>
          </div>
        </div>
        <p className="text-blue-100 max-w-2xl mt-2">
          Complete design language documentation: color palette, typography, spacing, border radius,
          shadows, all reusable components with variants, and full-page layouts.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {activeTab === 'Design Tokens' && <DesignTokensTab />}
        {activeTab === 'Components' && <ComponentsTab />}
        {activeTab === 'Pages Overview' && <PagesOverviewTab />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB 1 — DESIGN TOKENS
═══════════════════════════════════════════════════════════════════════════ */
function DesignTokensTab() {
  const colorGroups = [
    {
      name: 'Primary Blue',
      desc: 'Main brand color — buttons, links, active nav, highlights',
      swatches: [
        { label: 'blue-50', hex: '#EFF6FF', textDark: true },
        { label: 'blue-100', hex: '#DBEAFE', textDark: true },
        { label: 'blue-200', hex: '#BFDBFE', textDark: true },
        { label: 'blue-500', hex: '#3B82F6', textDark: false },
        { label: 'blue-600', hex: '#2563EB', textDark: false },
        { label: 'blue-700', hex: '#1D4ED8', textDark: false },
      ],
    },
    {
      name: 'Teal / Accent',
      desc: 'Secondary brand accent — gradients, charts, icons',
      swatches: [
        { label: 'teal-50', hex: '#F0FDFA', textDark: true },
        { label: 'teal-100', hex: '#CCFBF1', textDark: true },
        { label: 'teal-500', hex: '#14B8A6', textDark: false },
        { label: 'teal-600', hex: '#0D9488', textDark: false },
        { label: 'teal-700', hex: '#0F766E', textDark: false },
      ],
    },
    {
      name: 'Green — Success',
      desc: 'Confirmed status, completed, paid, normal vitals',
      swatches: [
        { label: 'green-50', hex: '#F0FDF4', textDark: true },
        { label: 'green-100', hex: '#DCFCE7', textDark: true },
        { label: 'green-500', hex: '#22C55E', textDark: false },
        { label: 'green-600', hex: '#16A34A', textDark: false },
        { label: 'green-700', hex: '#15803D', textDark: false },
      ],
    },
    {
      name: 'Orange — Warning',
      desc: 'Pending, follow-up needed, moderate severity',
      swatches: [
        { label: 'orange-50', hex: '#FFF7ED', textDark: true },
        { label: 'orange-100', hex: '#FFEDD5', textDark: true },
        { label: 'orange-500', hex: '#F97316', textDark: false },
        { label: 'orange-600', hex: '#EA580C', textDark: false },
        { label: 'orange-700', hex: '#C2410C', textDark: false },
      ],
    },
    {
      name: 'Red — Destructive',
      desc: 'Cancelled, overdue, cancelled, critical alerts',
      swatches: [
        { label: 'red-50', hex: '#FEF2F2', textDark: true },
        { label: 'red-100', hex: '#FEE2E2', textDark: true },
        { label: 'red-500', hex: '#EF4444', textDark: false },
        { label: 'red-600', hex: '#DC2626', textDark: false },
        { label: 'red-700', hex: '#B91C1C', textDark: false },
      ],
    },
    {
      name: 'Purple — Special',
      desc: 'Active doctors, admin actions, charts',
      swatches: [
        { label: 'purple-50', hex: '#F5F3FF', textDark: true },
        { label: 'purple-100', hex: '#EDE9FE', textDark: true },
        { label: 'purple-500', hex: '#A855F7', textDark: false },
        { label: 'purple-600', hex: '#9333EA', textDark: false },
      ],
    },
    {
      name: 'Gray — Neutral',
      desc: 'Backgrounds, borders, text, disabled states',
      swatches: [
        { label: 'gray-50', hex: '#F9FAFB', textDark: true },
        { label: 'gray-100', hex: '#F3F4F6', textDark: true },
        { label: 'gray-200', hex: '#E5E7EB', textDark: true },
        { label: 'gray-300', hex: '#D1D5DB', textDark: true },
        { label: 'gray-400', hex: '#9CA3AF', textDark: true },
        { label: 'gray-500', hex: '#6B7280', textDark: false },
        { label: 'gray-600', hex: '#4B5563', textDark: false },
        { label: 'gray-700', hex: '#374151', textDark: false },
        { label: 'gray-900', hex: '#111827', textDark: false },
      ],
    },
  ];

  const gradients = [
    { name: 'Brand Primary', value: 'from-blue-500 to-teal-500', from: '#3B82F6', to: '#14B8A6', usage: 'Logo icon, avatars, AppointmentCard icon, patient avatar' },
    { name: 'Login Panel', value: 'from-blue-600 via-blue-500 to-teal-500', from: '#2563EB', to: '#14B8A6', usage: 'Login page left branding panel' },
    { name: 'Summary Card', value: 'from-blue-600 to-teal-600', from: '#2563EB', to: '#0D9488', usage: 'Revenue summary, payment summary cards' },
    { name: 'Prescription Preview', value: 'from-blue-50 to-teal-50', from: '#EFF6FF', to: '#F0FDFA', usage: 'Prescription preview background' },
    { name: 'Sidebar Role', value: 'from-blue-50 to-teal-50', from: '#EFF6FF', to: '#F0FDFA', usage: 'Sidebar bottom role badge background' },
  ];

  const typography = [
    { tag: 'H1', class: 'text-2xl', size: '24px / 1.5rem', weight: '500 (medium)', lineHeight: '1.5', usage: 'Page titles — "Admin Dashboard", "Good Morning, Dr. Sarah"' },
    { tag: 'H2', class: 'text-xl / text-lg', size: '20–18px', weight: '500 (medium)', lineHeight: '1.5', usage: 'Section headings — "Revenue Overview", "Today\'s Appointments"' },
    { tag: 'H3', class: 'text-lg', size: '18px / 1.125rem', weight: '500 (medium)', lineHeight: '1.5', usage: 'Sub-section headers, card titles' },
    { tag: 'H4 / Label', class: 'text-base', size: '16px / 1rem', weight: '500 (medium)', lineHeight: '1.5', usage: 'Form labels, emphasis text' },
    { tag: 'Body', class: 'text-sm', size: '14px / 0.875rem', weight: '400 (normal)', lineHeight: '1.5', usage: 'Card body text, table cells, notification text' },
    { tag: 'Caption', class: 'text-xs', size: '12px / 0.75rem', weight: '400 (normal)', lineHeight: '1.5', usage: 'Timestamps, sub-labels, badge text, status pills' },
  ];

  const spacing = [
    { token: 'p-1', px: '4px', usage: 'Tight icon button padding' },
    { token: 'p-2', px: '8px', usage: 'Icon button padding (topbar)' },
    { token: 'p-3', px: '12px', usage: 'Patient list items, badge content, small cards' },
    { token: 'p-4', px: '16px', usage: 'Table cells, form fields, notification items' },
    { token: 'p-6', px: '24px', usage: 'Card inner padding (standard)' },
    { token: 'p-8', px: '32px', usage: 'Page outer padding' },
    { token: 'p-12', px: '48px', usage: 'Login panel inner padding' },
    { token: 'gap-2', px: '8px', usage: 'Icon + label gap in nav items, badge gap' },
    { token: 'gap-3', px: '12px', usage: 'Avatar + text gap, form field gap' },
    { token: 'gap-4', px: '16px', usage: 'Card grid gap, form grid gap' },
    { token: 'gap-6', px: '24px', usage: 'Main grid gap between columns' },
    { token: 'space-y-4', px: '16px', usage: 'Vertical space between form fields, list items' },
    { token: 'space-y-6', px: '24px', usage: 'Vertical space between page sections' },
    { token: 'space-y-8', px: '32px', usage: 'Major page section spacing' },
  ];

  const radii = [
    { token: 'rounded-lg', px: '8px', usage: 'Buttons, input fields, small cards, dropdowns' },
    { token: 'rounded-xl', px: '12px', usage: 'Section cards, chart containers, stat cards' },
    { token: 'rounded-2xl', px: '16px', usage: 'Login form card' },
    { token: 'rounded-full', px: '9999px', usage: 'Status badges, avatar circles, notification dot' },
  ];

  const shadows = [
    { token: 'shadow-sm', desc: '0 1px 2px rgba(0,0,0,0.05)', usage: 'Standard card elevation (most cards)' },
    { token: 'shadow-md', desc: '0 4px 6px rgba(0,0,0,0.07)', usage: 'Hovered card state' },
    { token: 'shadow-lg', desc: '0 10px 15px rgba(0,0,0,0.1)', usage: 'Dropdowns (notifications, profile menu)' },
    { token: 'shadow-xl', desc: '0 20px 25px rgba(0,0,0,0.1)', usage: 'Login form card' },
  ];

  return (
    <div>
      <Section title="Color Palette" subtitle="All color tokens used across the application. Tailwind CSS class names are shown.">
        <div className="space-y-10">
          {colorGroups.map((group) => (
            <Subsection key={group.name} title={`${group.name} — ${group.desc}`}>
              <div className="flex flex-wrap gap-3">
                {group.swatches.map((swatch) => (
                  <div key={swatch.label} className="flex flex-col items-center gap-2">
                    <div
                      className="w-20 h-16 rounded-lg border border-gray-200 shadow-sm"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <TokenLabel name={swatch.label} value={swatch.hex} />
                  </div>
                ))}
              </div>
            </Subsection>
          ))}
        </div>
      </Section>

      <Section title="Gradients" subtitle="Linear gradients used for brand elements, icons, and decorative surfaces.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradients.map((g) => (
            <div key={g.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div
                className="h-20"
                style={{ background: `linear-gradient(to right, ${g.from}, ${g.to})` }}
              />
              <div className="p-4">
                <p className="text-sm text-gray-900 mb-1">{g.name}</p>
                <p className="text-xs font-mono text-gray-500 mb-2">{g.value}</p>
                <p className="text-xs text-gray-400">{g.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" subtitle="Font: System sans-serif (Inter recommended). All styles defined in theme.css @layer base.">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Element</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {typography.map((t) => (
                <tr key={t.tag}>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">{t.tag}</td>
                  <td className="px-6 py-4">
                    <span className={`text-gray-900 ${t.class.split(' / ')[0]}`}>
                      {t.tag === 'Caption' ? 'Caption text' : t.tag === 'Body' ? 'Body text sample' : `${t.tag} Heading`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-blue-600 font-mono">{t.class}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{t.size}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{t.weight}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{t.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Spacing Scale" subtitle="Padding and gap tokens applied across the layout.">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Token</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Visual</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {spacing.map((s) => (
                <tr key={s.token}>
                  <td className="px-6 py-4 text-xs font-mono text-blue-600">{s.token}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{s.px}</td>
                  <td className="px-6 py-4">
                    <div className="bg-blue-200 h-3 rounded" style={{ width: s.px }} />
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{s.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Border Radius" subtitle="Rounded corner values.">
          <div className="space-y-4">
            {radii.map((r) => (
              <div key={r.token} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4">
                <div
                  className="w-16 h-12 bg-gradient-to-br from-blue-500 to-teal-500 flex-shrink-0"
                  style={{ borderRadius: r.px === '9999px' ? '9999px' : r.px }}
                />
                <div>
                  <p className="text-sm font-mono text-blue-600">{r.token}</p>
                  <p className="text-xs text-gray-500">{r.px} · {r.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Shadows & Elevation" subtitle="Box shadow tokens for depth and layering.">
          <div className="space-y-4">
            {shadows.map((s) => (
              <div
                key={s.token}
                className={`bg-white rounded-xl border border-gray-200 p-4 ${s.token}`}
              >
                <p className="text-sm font-mono text-blue-600 mb-1">{s.token}</p>
                <p className="text-xs text-gray-500 mb-1">{s.desc}</p>
                <p className="text-xs text-gray-400">{s.usage}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB 2 — COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */
function ComponentsTab() {
  return (
    <div>
      {/* ── BUTTONS ── */}
      <Section title="Buttons" subtitle="All button variants used throughout the application.">
        <Subsection title="Primary Variants">
          <div className="flex flex-wrap gap-3 items-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
              <Activity className="w-5 h-5" />
              Primary (Blue)
            </button>
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Teal Action
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              Mark Paid
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
              Outline / Secondary
            </button>
            <button className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-sm text-gray-700 transition-all">
              Quick Action Card
            </button>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Text / Link Button
            </button>
            <button className="text-sm text-red-600 hover:bg-red-50 rounded-lg px-3 py-1">
              Destructive Text
            </button>
          </div>
        </Subsection>

        <Subsection title="Small Variants (table row actions)">
          <div className="flex flex-wrap gap-3 items-center">
            <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
            <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">Cancel</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">View</button>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">Pay Now</button>
            <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">Mark Paid</button>
          </div>
        </Subsection>

        <Subsection title="Icon-only Buttons">
          <div className="flex gap-3 items-center">
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Menu className="w-5 h-5 text-gray-600" /></button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Search className="w-5 h-5 text-gray-600" /></button>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Printer className="w-4 h-4" /></button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded"><Download className="w-4 h-4" /></button>
          </div>
        </Subsection>
      </Section>

      {/* ── BADGES / STATUS PILLS ── */}
      <Section title="Badges & Status Pills" subtitle="rounded-full pills used in tables, cards, and appointment lists.">
        <Subsection title="Appointment / Invoice Status">
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">confirmed</span>
            <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">pending</span>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">completed</span>
            <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">cancelled</span>
            <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">overdue</span>
          </div>
        </Subsection>

        <Subsection title="Condition Status & Severity">
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">Ongoing</span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Controlled</span>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">Recurring</span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Mild</span>
            <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">Moderate</span>
            <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Severe</span>
          </div>
        </Subsection>

        <Subsection title="Vitals Status">
          <div className="flex gap-3">
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Normal</span>
            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Abnormal</span>
          </div>
        </Subsection>

        <Subsection title="Service Tags (Billing)">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">Consultation</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">Lab Tests</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">X-Ray</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Follow-up</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Regular Checkup</span>
          </div>
        </Subsection>
      </Section>

      {/* ── INPUTS ── */}
      <Section title="Form Inputs" subtitle="All input field patterns used in forms and filters.">
        <Subsection title="Text Input — Plain">
          <input
            type="text"
            placeholder="e.g., Amoxicillin 500mg"
            className="w-full max-w-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </Subsection>

        <Subsection title="Input with Icon (Search)">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </Subsection>

        <Subsection title="Input with Left Icon (Email / Lock)">
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" placeholder="doctor@example.com" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>
        </Subsection>

        <Subsection title="Textarea">
          <textarea
            rows={3}
            placeholder="Add any additional notes..."
            className="w-full max-w-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </Subsection>

        <Subsection title="Date & Time Inputs">
          <div className="flex gap-4">
            <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            <input type="time" className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
        </Subsection>

        <Subsection title="Tab Switcher (View Toggle)">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 w-fit">
            <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">Calendar</button>
            <button className="px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100">List</button>
          </div>
        </Subsection>
      </Section>

      {/* ── CARDS ── */}
      <Section title="Cards & Containers" subtitle="Surface containers for content sections.">
        <Subsection title="Standard White Card (shadow-sm, border, rounded-xl)">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-sm">
            <h2 className="text-lg text-gray-900 mb-2">Card Title</h2>
            <p className="text-sm text-gray-500">This is the standard card used throughout the app for sections, charts, and lists.</p>
          </div>
        </Subsection>

        <Subsection title="Stats Card — All 6 Color Variants">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { color: 'blue', from: 'from-blue-500', to: 'to-blue-600', title: 'Total Patients', value: '1,284', change: '+12% this month' },
              { color: 'teal', from: 'from-teal-500', to: 'to-teal-600', title: 'Appointments', value: '48', change: '8 pending' },
              { color: 'green', from: 'from-green-500', to: 'to-green-600', title: 'Revenue', value: '$28K', change: '+18%' },
              { color: 'orange', from: 'from-orange-500', to: 'to-orange-600', title: 'Pending Reviews', value: '8', change: '3 urgent' },
              { color: 'purple', from: 'from-purple-500', to: 'to-purple-600', title: 'Active Doctors', value: '24', change: '2 on leave' },
              { color: 'red', from: 'from-red-500', to: 'to-red-600', title: 'Overdue', value: '$890', change: '1 invoice' },
            ].map((stat) => (
              <div key={stat.color} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-gray-600">{stat.title}</p>
                  <div className={`w-9 h-9 bg-gradient-to-br ${stat.from} ${stat.to} rounded-lg flex items-center justify-center`}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>
        </Subsection>

        <Subsection title="Gradient Summary Card (from-blue-600 to-teal-600)">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white max-w-sm">
            <h2 className="text-lg mb-4 text-white">Monthly Revenue</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Total Collected</span>
                <span className="text-2xl text-white">$23,210</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Pending</span>
                <span className="text-xl text-white">$5,240</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Expected Total</span>
                  <span className="text-2xl text-white">$28,450</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-white text-blue-600 rounded-lg text-sm hover:bg-blue-50">
              View Detailed Report
            </button>
          </div>
        </Subsection>

        <Subsection title="Hero Banner Card (Patient view header)">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white max-w-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-white mb-1">My Billing & Payments</h1>
                <p className="text-blue-100">View your invoices and payment history</p>
              </div>
            </div>
          </div>
        </Subsection>

        <Subsection title="Info Notice / Alert Card">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 max-w-md">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">🔒</span>
            </div>
            <div>
              <p className="text-sm text-gray-900 mb-1">View-Only Access</p>
              <p className="text-xs text-gray-600">You can view your records but cannot make changes. Contact your provider for updates.</p>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* ── APPOINTMENT CARD ── */}
      <Section title="Appointment Card" subtitle="All 4 status variants — used in Doctor Dashboard.">
        <div className="space-y-3 max-w-2xl">
          {([
            { time: '09:00 AM', patient: 'John Smith', reason: 'Regular Checkup', status: 'completed' as const },
            { time: '10:00 AM', patient: 'Michael Brown', reason: 'Lab Results Review', status: 'in-progress' as const },
            { time: '10:30 AM', patient: 'Sarah Davis', reason: 'Consultation', status: 'upcoming' as const },
            { time: '11:00 AM', patient: 'James Wilson', reason: 'Physical Exam', status: 'cancelled' as const },
          ]).map((appt) => {
            const statusConfig = {
              completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
              'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
              upcoming: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Upcoming' },
              cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
            };
            const cfg = statusConfig[appt.status];
            return (
              <div key={appt.time} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all bg-white">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-gray-900">{appt.time}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <User className="w-4 h-4" /><span>{appt.patient}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" /><span>{appt.reason}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {appt.status === 'upcoming' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Start</button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg">Reschedule</button>
                    </>
                  )}
                  {appt.status === 'in-progress' && <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg">Complete</button>}
                  {appt.status === 'completed' && <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg">View Details</button>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── AVATARS ── */}
      <Section title="Avatars & User Icons" subtitle="Avatar styles used for patients, doctors, and current user.">
        <Subsection title="Gradient Avatar Sizes">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-500">w-8 h-8</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-500">w-10 h-10</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-500">w-12 h-12</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-gray-500">w-16 h-16</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <span className="text-xs text-gray-500">w-20 h-20</span>
            </div>
          </div>
        </Subsection>
        <Subsection title="Logo Icon (rounded-xl variant)">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-500">Sidebar logo (40px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" style={{ color: '#3B82F6' }} />
              </div>
              <span className="text-xs text-gray-500">Login panel (48px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-500">Quick action icon</span>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* ── SIDEBAR ── */}
      <Section title="Sidebar" subtitle="Fixed width 256px (w-64). White background, right border.">
        <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-900 text-sm">HealthCare</p>
              <p className="text-xs text-gray-500">Clinic Management</p>
            </div>
          </div>
          {/* Nav items */}
          <nav className="p-4 space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Calendar, label: 'Appointments', active: false },
              { icon: Users, label: 'Patient Records', active: false },
              { icon: ClipboardList, label: 'Prescriptions', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
                  item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </nav>
          {/* Role badge */}
          <div className="p-4 border-t border-gray-200">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm text-gray-900 capitalize">Doctor</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── TOPBAR ── */}
      <Section title="Topbar / Header" subtitle="Full-width header: white bg, bottom border, px-6 py-4.">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search patients, appointments..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500 capitalize">doctor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── NOTIFICATION DROPDOWN ── */}
      <Section title="Notification Dropdown" subtitle="Appears on Bell icon click. w-80, shadow-lg, border.">
        <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900 text-sm">Notifications</h3>
          </div>
          {[
            { text: 'New appointment scheduled', time: '5 min ago', unread: true },
            { text: 'Patient John Doe checked in', time: '15 min ago', unread: true },
            { text: 'Lab results ready for review', time: '1 hour ago', unread: false },
          ].map((notif, i) => (
            <div key={i} className={`p-4 border-b border-gray-100 ${notif.unread ? 'bg-blue-50' : ''}`}>
              <p className="text-sm text-gray-900">{notif.text}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>
          ))}
          <div className="p-3 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600">View all notifications</button>
          </div>
        </div>
      </Section>

      {/* ── NOTIFICATION ITEMS ── */}
      <Section title="Inline Notifications (Doctor Dashboard)" subtitle="Used in notification list panel. Icon color encodes type.">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-sm space-y-4">
          {[
            { type: 'info', message: 'Lab results available for Michael Brown', time: '10 min ago' },
            { type: 'warning', message: 'Upcoming appointment in 30 minutes', time: '5 min ago' },
            { type: 'success', message: 'Patient Emma Johnson checked out', time: '1 hour ago' },
          ].map((notif, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                notif.type === 'info' ? 'bg-blue-100' : notif.type === 'warning' ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                <AlertCircle className={`w-4 h-4 ${
                  notif.type === 'info' ? 'text-blue-600' : notif.type === 'warning' ? 'text-orange-600' : 'text-green-600'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-900">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TABLE ── */}
      <Section title="Data Table" subtitle="Used in Appointments (list view), Billing, User Management. Hover row: bg-gray-50.">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Time</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Patient</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Doctor</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Type</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { time: '09:00 AM', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', type: 'Checkup', status: 'confirmed' },
                { time: '09:30 AM', patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', type: 'Follow-up', status: 'pending' },
                { time: '10:00 AM', patient: 'James Brown', doctor: 'Dr. Sarah Johnson', type: 'Consultation', status: 'completed' },
                { time: '10:30 AM', patient: 'Lisa Anderson', doctor: 'Dr. Robert Lee', type: 'Lab Review', status: 'cancelled' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {row.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-900">{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.doctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      row.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      row.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      row.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── CALENDAR CELL ── */}
      <Section title="Calendar Elements" subtitle="Calendar grid — 7-column grid, each cell min-h-[100px].">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-xl">
          <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-50 p-3 text-center">
                <span className="text-xs text-gray-600">{day}</span>
              </div>
            ))}
            {[null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((day, i) => (
              <div key={i} className={`bg-white p-2 min-h-[60px] ${day ? 'hover:bg-blue-50 cursor-pointer' : ''}`}>
                {day && (
                  <>
                    <span className={`text-xs ${
                      day === 7 ? 'w-6 h-6 bg-blue-600 text-white rounded-full inline-flex items-center justify-center' : 'text-gray-900'
                    }`}>{day}</span>
                    {day === 3 && (
                      <div className="mt-1">
                        <div className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate">3 appts</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full inline-flex items-center justify-center text-xs">7</span>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">3 appts</span>
              <span>Has appointments</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── PATIENT LIST ITEM ── */}
      <Section title="Patient List Item" subtitle="Used in Patient Records sidebar panel (left column).">
        <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {[
            { name: 'John Smith', age: 45, gender: 'Male', lastVisit: '2 days ago', active: true },
            { name: 'Emma Wilson', age: 32, gender: 'Female', lastVisit: '1 week ago', active: false },
            { name: 'Michael Brown', age: 58, gender: 'Male', lastVisit: '3 days ago', active: false },
          ].map((p) => (
            <div key={p.name} className={`p-4 border-b border-gray-100 cursor-pointer ${p.active ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-blue-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.age} yrs • {p.gender}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Last visit: {p.lastVisit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── VITALS CARD ── */}
      <Section title="Vitals Card" subtitle="Used in Patient Records Vitals tab.">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
          {[
            { label: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
            { label: 'Heart Rate', value: '72', unit: 'bpm' },
            { label: 'Temperature', value: '98.6', unit: '°F' },
            { label: 'Blood Sugar', value: '105', unit: 'mg/dL' },
            { label: 'Weight', value: '180', unit: 'lbs' },
            { label: "Height", value: "5'10\"", unit: '' },
          ].map((v) => (
            <div key={v.label} className="p-4 border border-gray-200 rounded-lg bg-white">
              <p className="text-sm text-gray-500 mb-2">{v.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl text-gray-900">{v.value}</p>
                <p className="text-sm text-gray-500">{v.unit}</p>
              </div>
              <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Normal</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── ROLE SELECTOR ── */}
      <Section title="Role Selector (Login Page)" subtitle="3-column grid of role buttons with active state.">
        <div className="grid grid-cols-3 gap-2 max-w-xs">
          {['doctor', 'patient', 'admin'].map((role, i) => (
            <button key={role} className={`p-3 rounded-lg border-2 transition-all ${
              i === 0 ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'
            }`}>
              <User className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs capitalize">{role}</p>
            </button>
          ))}
        </div>
      </Section>

      {/* ── QUICK ACTIONS ── */}
      <Section title="Quick Action Button" subtitle="2-border card with hover effect. Used in Admin Dashboard.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          {[
            { label: 'Add New Patient', icon: Users, color: 'blue' },
            { label: 'Schedule Appointment', icon: Calendar, color: 'teal' },
            { label: 'Generate Report', icon: Activity, color: 'purple' },
            { label: 'View All Doctors', icon: Users, color: 'green' },
          ].map((action) => {
            const Icon = action.icon;
            const gradients: Record<string, string> = {
              blue: 'from-blue-500 to-blue-600',
              teal: 'from-teal-500 to-teal-600',
              purple: 'from-purple-500 to-purple-600',
              green: 'from-green-500 to-green-600',
            };
            return (
              <button key={action.label} className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradients[action.color]} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-900 group-hover:text-blue-600">{action.label}</p>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── PRESCRIPTION TEMPLATE CARD ── */}
      <Section title="Prescription Template Card" subtitle="Used in Prescriptions sidebar — hover state with blue accent border.">
        <div className="space-y-2 max-w-xs">
          {['Common Cold — 3 medicines', 'Hypertension — 2 medicines', 'Diabetes Type 2 — 2 medicines'].map((t) => {
            const [name, count] = t.split(' — ');
            return (
              <button key={name} className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                <p className="text-sm text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{count}</p>
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB 3 — PAGES OVERVIEW
═══════════════════════════════════════════════════════════════════════════ */
function PagesOverviewTab() {
  const pages = [
    {
      name: 'Login Page',
      roles: 'All users',
      layout: 'Split: left gradient panel (w-1/2) + right form (flex-1)',
      elements: ['Brand logo + name', 'Hero text + 4 stat boxes (white/10 bg)', 'Role selector (3 cols)', 'Login/Register tabs', 'Email + Password inputs', 'Remember me + Forgot password', 'Sign In button (full width)', 'Terms/Privacy links'],
      colors: 'Left panel: from-blue-600 via-blue-500 to-teal-500 | Right: bg-gray-50 | Form card: white, shadow-xl, rounded-2xl',
    },
    {
      name: 'Admin Dashboard',
      roles: 'admin',
      layout: 'p-8 space-y-8 — Stats (4 col) → Quick Actions (4 col) → Charts (2 col) → Recent Bookings + Pie Chart (3 col)',
      elements: ['4x Stats cards (blue/teal/green/purple)', 'Quick Actions (4 buttons)', 'Revenue LineChart', 'Weekly Appointments BarChart', 'Recent Bookings list with avatar + status', 'Department PieChart with legend'],
      colors: 'Charts: Line #3B82F6 | Bar #14B8A6 | Pie: blue/teal/amber/purple/gray',
    },
    {
      name: 'Doctor Dashboard',
      roles: 'doctor',
      layout: '4 Stats → [Appointments list 2/3 col] + [Notifications + Recent Patients 1/3 col]',
      elements: ['4x Stats cards (blue/teal/orange/green)', 'AppointmentCard list (4 status variants)', 'Notification panel (info/warning/success)', 'Recent Patients (name + condition dot)'],
      colors: 'Same white card pattern | Info bg-blue-100, Warning bg-orange-100, Success bg-green-100',
    },
    {
      name: 'Patient Dashboard',
      roles: 'patient',
      layout: 'Gradient hero banner → 3 stat cards → Next appointment → Recent visits',
      elements: ['Hero banner (from-blue-600 to-teal-600)', 'Appointment stats (upcoming/completed/total)', 'Next appointment card', 'Recent visit history list'],
      colors: 'Patient-specific filtered data. Same card pattern.',
    },
    {
      name: 'Appointments Page',
      roles: 'all',
      layout: 'Header → Filters bar → [Calendar View] or [List Table]',
      elements: ['Calendar/List toggle (view switcher)', 'New Appointment button → Modal dialog', 'Search + Doctor filter + Status filter', 'Calendar: 7-col grid, day cells, appointment dots', 'List: table with Time/Patient/Doctor/Type/Status/Actions'],
      colors: 'Active toggle: bg-blue-600 text-white | Today cell: bg-blue-600 rounded-full | Appointment chip: bg-blue-100 text-blue-700',
    },
    {
      name: 'Patient Records',
      roles: 'doctor/admin',
      layout: '[Patient list sidebar 1/4 col] + [Patient detail 3/4 col]',
      elements: ['Add New Patient button → large modal (2-col form)', 'Patient list with search', 'Patient profile card (avatar + info grid)', 'Tabs: Visit History / Vitals / Medical History / Prescriptions', 'Visit cards, Vitals grid, Condition rows'],
      colors: 'Active patient: border-l-4 border-l-blue-600 bg-blue-50 | Allergy field: bg-red-50',
    },
    {
      name: 'Medical Records (Patient)',
      roles: 'patient',
      layout: 'Gradient header → Profile card (read-only) → Tabs (read-only) → Privacy notice',
      elements: ['Hero banner', 'Profile info (no Edit button)', 'Same tabs but no Add buttons', 'Privacy notice (bg-blue-50)'],
      colors: 'Same as Patient Records but with view-only restrictions UI',
    },
    {
      name: 'Prescriptions',
      roles: 'doctor',
      layout: '[Form area 2/3 col] + [Sidebar panel 1/3 col]',
      elements: ['Patient search + date', 'Patient preview (bg-blue-50)', 'Medicine rows (add/remove)', 'Frequency/Timing selects', 'Notes textarea', 'Save Draft + Print + Export PDF buttons', 'Recent Prescriptions list', 'Templates panel', 'Prescription preview (white bg-on-blue-teal)'],
      colors: 'Print button: blue-600 | Export PDF: teal-600 | Prescription preview bg: from-blue-50 to-teal-50',
    },
    {
      name: 'Billing Page',
      roles: 'admin/doctor',
      layout: 'Header → Stats (4 col) → Filters → Invoice Table → [Transactions] + [Revenue Summary]',
      elements: ['Generate Invoice button → large modal', 'Stats: Revenue/Pending/Paid/Overdue', 'Table: InvoiceID/Patient/Date/Services/Amount/Status/Actions', 'Service tag chips', 'Printer/Download action icons', 'Recent Transactions list', 'Revenue gradient card'],
      colors: 'Service chips: bg-gray-100 (admin) vs bg-blue-50 (patient) | Mark Paid: green-600',
    },
    {
      name: 'Billing (Patient view)',
      roles: 'patient',
      layout: 'Hero banner → Stats (personal) → Filters → My Invoices table → [Recent Payments] + [Payment Summary gradient card]',
      elements: ['Hero banner with Receipt icon', 'Filtered personal stats', 'Invoice table (no Patient column)', 'Pay Now button on pending invoices', 'Payment summary gradient card'],
      colors: 'Same billing colors but filtered data. Pay Now: bg-blue-600',
    },
    {
      name: 'Reports & Stats',
      roles: 'admin only',
      layout: 'Full analytics page with multiple charts',
      elements: ['Revenue charts', 'Appointment statistics', 'Department breakdowns', 'Doctor performance metrics', 'Export controls'],
      colors: 'Same chart palette: blue, teal, amber, purple',
    },
    {
      name: 'User Management',
      roles: 'admin only',
      layout: 'Table of all users with role management',
      elements: ['Add User button', 'User table with Role/Status columns', 'Role badges', 'Enable/Disable actions'],
      colors: 'Role badges use the color system: blue (admin), teal (doctor), green (patient)',
    },
  ];

  return (
    <div>
      <Section title="Page Inventory" subtitle={`${pages.length} pages across 3 user roles. Each page documents layout, elements, and color usage.`}>
        <div className="space-y-6">
          {pages.map((page) => (
            <div key={page.name} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-gray-900">{page.name}</h3>
                <div className="flex gap-2">
                  {page.roles.split('/').map((role) => (
                    <span key={role} className={`px-3 py-1 rounded-full text-xs ${
                      role === 'admin' || role === 'admin only' ? 'bg-purple-100 text-purple-700' :
                      role === 'doctor' ? 'bg-teal-100 text-teal-700' :
                      role === 'patient' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{role}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Layout Structure</p>
                  <p className="text-sm text-gray-700">{page.layout}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Elements</p>
                  <ul className="space-y-1">
                    {page.elements.map((el, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"></span>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Color Notes</p>
                  <p className="text-xs text-gray-600">{page.colors}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Component Reuse Map" subtitle="Which components are shared across pages.">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Component</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Used In Pages</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Variants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { comp: 'Sidebar', pages: 'All authenticated pages', variants: '3 nav configs: doctor / admin / patient' },
                { comp: 'Topbar', pages: 'All authenticated pages', variants: 'Username/role changes per user' },
                { comp: 'StatsCard', pages: 'Admin Dashboard, Doctor Dashboard, Patient Dashboard, Billing', variants: '6 color variants: blue, teal, green, orange, purple, red' },
                { comp: 'AppointmentCard', pages: 'Doctor Dashboard', variants: '4 status: completed, in-progress, upcoming, cancelled' },
                { comp: 'Status Badge (pill)', pages: 'Appointments, Billing, Patient Records, User Management', variants: 'confirmed/pending/completed/cancelled/overdue + condition statuses' },
                { comp: 'Gradient Avatar', pages: 'Topbar, Sidebars, Tables, Patient cards, Appointment list', variants: 'w-8/w-10/w-12/w-16/w-20 sizes; rounded-full or rounded-xl' },
                { comp: 'Data Table', pages: 'Appointments (list), Billing, User Management', variants: 'Column configs differ; same header/row/hover pattern' },
                { comp: 'Search Input', pages: 'Topbar, Appointments, Patient Records, Billing, Prescriptions', variants: 'Same left-icon pattern; width varies' },
                { comp: 'Select/Dropdown', pages: 'Appointments, Billing, Prescriptions, User Management', variants: 'Width varies (w-[180px] most common); content differs' },
                { comp: 'Dialog/Modal', pages: 'Appointments (add), Patient Records (add patient), Billing (invoice)', variants: 'max-w-md (appointment/invoice) or max-w-2xl (add patient)' },
                { comp: 'Gradient Card (blue-teal)', pages: 'Billing summary, Patient header banners', variants: 'Hero banner vs financial summary layout' },
                { comp: 'Info Notice', pages: 'Patient Records, Billing (patient view)', variants: 'Same bg-blue-50 + lock icon pattern' },
                { comp: 'Chart Container', pages: 'Admin Dashboard, Reports', variants: 'LineChart (revenue), BarChart (appointments), PieChart (departments)' },
              ].map((row) => (
                <tr key={row.comp} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.comp}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.pages}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row.variants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Grid System" subtitle="Responsive layout patterns used throughout.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { pattern: '1-col → 2-col → 4-col', tailwind: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4', usage: 'Stats cards (Dashboard, Billing)' },
            { pattern: '1-col → 2-col', tailwind: 'grid-cols-1 lg:grid-cols-2', usage: 'Charts side-by-side, Patient info fields' },
            { pattern: '1-col → 3-col (2+1)', tailwind: 'grid-cols-1 lg:grid-cols-3, lg:col-span-2', usage: 'Dashboard content + sidebar panels' },
            { pattern: '1-col → 4-col (1+3)', tailwind: 'grid-cols-1 lg:grid-cols-4, lg:col-span-3', usage: 'Patient Records: patient list + detail' },
            { pattern: '1-col → 3-col (3-up)', tailwind: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', usage: 'Vitals grid, Patient info detail fields' },
            { pattern: 'Login Split', tailwind: 'flex: hidden lg:flex lg:w-1/2 + flex-1', usage: 'Login page: left panel + right form' },
          ].map((g) => (
            <div key={g.pattern} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-sm text-gray-900 mb-1">{g.pattern}</p>
              <p className="text-xs font-mono text-blue-600 mb-2">{g.tailwind}</p>
              <p className="text-xs text-gray-500">{g.usage}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
