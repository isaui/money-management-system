export const handleTimeChange = (currentDate: Date, event: React.ChangeEvent<HTMLInputElement>) : Date=> {
    const inputTime = event.target.value;
    const [hours, minutes, seconds] = inputTime.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return currentDate;
    }
    const updatedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes,
      seconds
    );

    return updatedDate
  };