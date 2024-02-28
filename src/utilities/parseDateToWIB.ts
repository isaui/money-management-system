export function parseDateToWIB(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat('id-ID', options);
    return formatter.format(date);
}