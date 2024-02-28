export async function blobToBase64(blob: Blob): Promise<string> {
    const buffer = await blob.arrayBuffer();
    return 'data:image/png;base64,'+Buffer.from(buffer).toString('base64');
  }