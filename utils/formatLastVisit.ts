/**
 * Formats a date string like "2026-8-20" or "2026-04-20" into relative time:
 * "Today", "1 day ago", "5 days ago", "1 month ago", "3 months ago"
 */
export function formatLastVisit(dateStr: string | undefined | null): string {
  if (!dateStr) return "—";

  const trimmed = dateStr.trim();

  // Already formatted relative string — return as is (e.g. "Today", "2 days ago")
  // Heuristic: if it contains letters and "ago" or "Today"
  if (/^(today|yesterday|\d+\s+(day|month|year)s?\s+ago)$/i.test(trimmed)) {
    // Capitalize first letter for consistency
    if (trimmed.toLowerCase() === "today") return "Today";
    return trimmed;
  }

  // Try parse as date - supports "2026-8-20", "2026-08-20", "2026/08/20"
  const normalized = trimmed.replace(/\//g, "-");
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }

  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDate = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());

  const diffMs = startToday.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Future dates or same day
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 60) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  const years = Math.floor(diffDays / 365);
  if (years === 1) return "1 year ago";
  return `${years} years ago`;
}

export default formatLastVisit;
