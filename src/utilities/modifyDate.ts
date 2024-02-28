export const handleDateChange = (currentDate: Date, event: React.ChangeEvent<HTMLInputElement>) :Date => {
    const inputValue = event.target.value;
    const inputDate = new Date(inputValue);

    const updatedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      inputDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    );

    return updatedDate;
  };