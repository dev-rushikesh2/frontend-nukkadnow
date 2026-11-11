export function formatSlotTime(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}

export function getRelativeTimeString(dateIso: string): string {
  const diffMs = Date.now() - new Date(dateIso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}
