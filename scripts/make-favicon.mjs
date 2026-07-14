// Generates the favicon + apple-touch icon from the real client logo.
// The chevron mark sits in the left ~36% of public/logo.png; we crop it,
// trim the transparent edges, pad to a square and export:
//   src/app/icon.png        (512x512, transparent bg — browser tab)
//   src/app/apple-icon.png  (180x180, brand green bg — iOS home screen)
// Run: node scripts/make-favicon.mjs
import sharp from "sharp";

const SRC = "public/logo.png";

const meta = await sharp(SRC).metadata();
const markWidth = Math.round(meta.width * 0.36);

// Two passes: sharp reorders trim/extract inside a single pipeline.
const cropped = await sharp(SRC)
  .extract({ left: 0, top: 0, width: markWidth, height: meta.height })
  .png()
  .toBuffer();
const mark = await sharp(cropped).trim().png().toBuffer();

const markMeta = await sharp(mark).metadata();
const side = Math.round(Math.max(markMeta.width, markMeta.height) * 1.16);

// Composite at full size into a buffer first — sharp would otherwise resize
// the canvas before compositing, making the mark too big to fit.
async function squareCanvas(background) {
  return sharp({
    create: { width: side, height: side, channels: 4, background },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

await sharp(await squareCanvas({ r: 0, g: 0, b: 0, alpha: 0 }))
  .resize(512, 512)
  .toFile("src/app/icon.png");

await sharp(await squareCanvas({ r: 15, g: 45, b: 31, alpha: 1 }))
  .resize(180, 180)
  .toFile("src/app/apple-icon.png");

console.log(`done — mark ${markMeta.width}x${markMeta.height}, canvas ${side}px`);
