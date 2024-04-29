export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (_e, _src, _line, _col, err) => {
      reject(err);
    };

    img.src = url;
  });
}
