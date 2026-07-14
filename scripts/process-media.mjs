/**
 * One-off media pipeline: client originals (../_media_extracted) → web assets.
 * - Photos: EXIF auto-rotate, optional edge crop (camera watermark), ≤1600px, WebP q80.
 *   sharp strips all metadata (EXIF/GPS) by default — keep it that way.
 * - Run from greenup/:  node scripts/process-media.mjs
 * Videos are handled separately with ffmpeg (see DOMAIN-SETUP notes / git history).
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("..", "_media_extracted", "Per web page");
const OUT = path.resolve("public", "images", "projects");

/** @type {Array<{in: string, out: string, cropRight?: number, cropBottom?: number}>} */
const PHOTOS = [
  // Fakulteti Filologjik — passenger elevator, installation phase
  { in: "Fakulteti Filologjik Prishtine/20241229_172619.jpg", out: "filologjiku-1" },
  { in: "Fakulteti Filologjik Prishtine/20241229_172627.jpg", out: "filologjiku-2" },

  // Fakulteti i Arkitekturës — indoor vertical accessibility platform (finished)
  { in: "Fakulteti i Arkitektures Prishtine/11402d70b765e1f3d35c0065635129e6.png", out: "arkitektura-1" },
  { in: "Fakulteti i Arkitektures Prishtine/6b453670c6e9799d1a32e0eb766daafa.png", out: "arkitektura-2" },
  { in: "Fakulteti i Arkitektures Prishtine/1d428169c97297e40cb215ea4d7f81bb.png", out: "arkitektura-3" },

  // Fakulteti i Edukimit — passenger elevator (finished cab + shaft work)
  { in: "Fakulteti i Edukimit Prishtine/20250626_091026.jpg", out: "edukimi-1" },
  { in: "Fakulteti i Edukimit Prishtine/20250609_135455.jpg", out: "edukimi-2" },
  { in: "Fakulteti i Edukimit Prishtine/20250305_124248.jpg", out: "edukimi-3" },
  { in: "Fakulteti i Edukimit Prishtine/20250305_124207.jpg", out: "edukimi-4" },
  { in: "Fakulteti i Edukimit Prishtine/20250305_124303.jpg", out: "edukimi-5" },
  { in: "Fakulteti i Edukimit Prishtine/20250627_140855.jpg", out: "edukimi-6" },

  // Fakulteti Juridik — inclined stair platform lift (finished)
  { in: "Fakulteti juridik Prishtine/20250205_123123.jpg", out: "juridiku-1" },
  { in: "Fakulteti juridik Prishtine/20250205_123345.jpg", out: "juridiku-2" },
  { in: "Fakulteti juridik Prishtine/20250205_123351.jpg", out: "juridiku-3" },

  // Ndërtesë banimi — residential passenger elevators (camera watermark lands at bottom after EXIF rotation)
  { in: "Ndertesa banimi - ashensore/20240926_135620.jpg", out: "banimi-1", cropBottom: 0.1 },
  { in: "Ndertesa banimi - ashensore/20240923_151800.jpg", out: "banimi-2", cropBottom: 0.1 },
  { in: "Ndertesa banimi - ashensore/20250401_202840.jpg", out: "banimi-3" },
  { in: "Ndertesa banimi - ashensore/20250401_202857.jpg", out: "banimi-4" },

  // Shtëpi e trashëgimisë kulturore — outdoor accessibility platform
  { in: "Shtepi e trashegimise kulturore/20241230_144953.jpg", out: "trashegimia-1" },
  { in: "Shtepi e trashegimise kulturore/20241230_144858.jpg", out: "trashegimia-2" },
  { in: "Shtepi e trashegimise kulturore/20241230_133253.jpg", out: "trashegimia-3" },
  { in: "Shtepi e trashegimise kulturore/20250429_121529.jpg", out: "trashegimia-4" },
];

const MAX = 1600;

await mkdir(OUT, { recursive: true });

for (const p of PHOTOS) {
  const src = path.join(SRC, p.in);
  const dest = path.join(OUT, `${p.out}.webp`);

  // .rotate() with no args applies the EXIF orientation, then discards it.
  let img = sharp(src).rotate();
  const meta = await img.metadata();
  // Dimensions AFTER exif rotation:
  const swap = (meta.orientation ?? 1) >= 5;
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;

  if (p.cropRight || p.cropBottom) {
    const cw = Math.round(w * (1 - (p.cropRight ?? 0)));
    const ch = Math.round(h * (1 - (p.cropBottom ?? 0)));
    img = img.extract({ left: 0, top: 0, width: cw, height: ch });
  }

  const info = await img
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest);

  console.log(`${p.out}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
console.log("done");
