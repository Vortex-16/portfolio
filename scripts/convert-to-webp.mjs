/**
 * convert-to-webp.mjs
 * Converts all PNG / JPG / JPEG images in /public to WebP (quality 82).
 * Deletes originals after successful conversion.
 * Run with:  node scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// Skip these files (favicon stays as PNG for broadest browser support)
const SKIP = new Set(['fav.png']);

const EXTS = ['.png', '.jpg', '.jpeg'];

async function convertAll() {
  const files = fs.readdirSync(publicDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return EXTS.includes(ext) && !SKIP.has(f);
  });

  if (files.length === 0) {
    console.log('No images to convert.');
    return;
  }

  let totalSavedBytes = 0;

  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const outputName = path.basename(file, path.extname(file)) + '.webp';
    const outputPath = path.join(publicDir, outputName);

    try {
      const originalSize = fs.statSync(inputPath).size;

      await sharp(inputPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const saved = originalSize - newSize;
      totalSavedBytes += saved;

      const pct = ((saved / originalSize) * 100).toFixed(1);
      console.log(
        `✓ ${file.padEnd(42)} → ${outputName.padEnd(42)} ` +
        `${(originalSize / 1024).toFixed(0).padStart(6)} KB → ${(newSize / 1024).toFixed(0).padStart(6)} KB  (-${pct}%)`
      );

      // Delete original only after successful conversion
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`✗ Failed: ${file} --- ${err.message}`);
    }
  }

  console.log(`\nDone. Total saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
}

convertAll();
