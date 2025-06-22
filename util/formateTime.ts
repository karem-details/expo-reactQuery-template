const formatTime = (seconds: number, showHours = false) => {
  const totalMinutes = Math.floor(seconds / 60);

  if (totalMinutes < 60 && !showHours) {
    // Format as MM:SS (under 1 hour)
    const minutes = totalMinutes;
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  } else {
    // Format as HH:MM:SS (1 hour or more)
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const remainingSeconds = seconds % 60;

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(remainingSeconds.toFixed(0)).padStart(2, '0'),
    ].join(':');
  }
};

export default formatTime;
