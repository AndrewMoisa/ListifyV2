export function getTimeRemaining(isoTime) {
  if (!isoTime) return "Expired"; // handles null/undefined

  const target = new Date(isoTime);
  if (isNaN(target.getTime())) return "Expired"; // handles invalid date

  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return "Expired";

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function startCountdown(isoTime, element) {
  function tick() {
    const timeRemaining = getTimeRemaining(isoTime);

    element.textContent = timeRemaining;

    if (timeRemaining !== "Expired") {
      const now = new Date();
      const delay = 1000 - now.getMilliseconds();
      setTimeout(tick, delay);
    }
  }

  tick();
}
