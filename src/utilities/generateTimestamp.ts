function generateTimestampISO8601WIB(): string {
    const now = new Date();
    const offset = 7; // UTC+7 for WIB
    const utcTimestamp = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wibTimestamp = new Date(utcTimestamp + (3600000 * offset));
    return wibTimestamp.toISOString();
}

export default generateTimestampISO8601WIB