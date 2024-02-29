export function parseDateToWIB(date: Date): string {
    const newDate = new Date(date.getTime() + (7 * 60 * 60 * 1000))
    const hours = newDate.getHours().toString().padStart(2,'0')
    const minutes = newDate.getMinutes().toString().padStart(2,'0')
    const dayOfMonth = newDate.getDate().toString().padStart(2,'0')
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const year = newDate.getFullYear()
    return `${hours}:${minutes}, ${dayOfMonth}-${month}-${year}`
}