import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/manufacturer-logos");
const outputDirectory = path.join(sourceDirectory, "normalized");
const files = (await fs.readdir(sourceDirectory)).filter((file) => file.endsWith(".png"));

await fs.mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  const source = path.join(sourceDirectory, file);
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const isBackground = (pixel) => {
    const offset = pixel * channels;
    if (data[offset + 3] === 0) return true;
    return data[offset] >= 242 && data[offset + 1] >= 242 && data[offset + 2] >= 242;
  };
  const enqueue = (pixel) => {
    if (visited[pixel] || !isBackground(pixel)) return;
    visited[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }
  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }
  for (let pixel = 0; pixel < visited.length; pixel += 1) {
    if (visited[pixel]) data[pixel * channels + 3] = 0;
  }

  await sharp(data, { raw: info })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 480, height: 180, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(outputDirectory, file));
}

console.log(`Normalized ${files.length} manufacturer logos.`);
