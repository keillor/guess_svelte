export function validImageUrl(url: string) {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|avif|bmp|tiff))/i;
    return regex.test(url);
}