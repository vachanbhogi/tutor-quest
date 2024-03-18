
export const formatTime = (timestamp: number): string => {
    const time = new Date(timestamp)
    const hour = time.getHours();
    const minute = time.getMinutes().toString().padStart(2, '0');
    const meridian = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${meridian}`;
};