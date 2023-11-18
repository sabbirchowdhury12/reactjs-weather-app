// Function to format the time in 12-hour format (AM/PM)
export function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zeros to minutes if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
