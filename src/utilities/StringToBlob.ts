async function stringToBlob(data: string): Promise<Blob> {
    if (data.startsWith('data:')) {
        const base64Data = data.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: data.split(';')[0].split(':')[1] });
    } else {
        const response = await fetch(data);
        const blob = await response.blob();
        return blob;
    }
}

export default stringToBlob
