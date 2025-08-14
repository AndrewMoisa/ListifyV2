export function getTimeRemaining(isoTime) {
  const target = new Date(isoTime);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h ${minutes % 60}m remaining`;
}
