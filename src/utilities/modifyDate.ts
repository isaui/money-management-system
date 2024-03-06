export const handleDateChange = (currentDate: Date, event: React.ChangeEvent<HTMLInputElement>) :Date => {
    const inputValue = event.target.value;
    const inputDate = new Date(inputValue);
    if (isNaN(inputDate.getTime())) {
      return currentDate;
    }
    const updatedDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    );

    return updatedDate;
  };