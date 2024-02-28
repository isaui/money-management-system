export function convertToYYYYMMDD(inputDate: Date): string {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month index
    const day = String(inputDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function convertToHHmmss(inputDate: Date): string {
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
