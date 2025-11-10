// src/app/tools/pdf/compress/lib/compress.ts
export async function compressImage(
  imageData: Uint8Array,
  quality: number
): Promise<Uint8Array> {
  return new Promise((resolve) => {
    // ✅ Force to ArrayBuffer (safe for file data)
    const buffer = imageData.buffer as ArrayBuffer;
    const blob = new Blob([new Uint8Array(buffer)], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return resolve(imageData);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (newBlob) => {
          URL.revokeObjectURL(url);
          if (!newBlob) return resolve(imageData);
          const reader = new FileReader();
          reader.onload = () => {
            resolve(new Uint8Array(reader.result as ArrayBuffer));
          };
          reader.onerror = () => resolve(imageData);
          reader.readAsArrayBuffer(newBlob);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(imageData);
    };

    img.src = url;
  });
}
