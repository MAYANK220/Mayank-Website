import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'sequence');
const outputDir = path.join(__dirname, 'public', 'sequence_jpg');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

async function compress() {
  console.log(`Starting compression of ${files.length} images...`);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.jpg'));
    
    // Resize width to 1280 to save massive amounts of decoded RAM
    // Convert to JPG at 60% quality to save massive amounts of network bandwidth
    await sharp(inputPath)
      .resize({ width: 1280 })
      .jpeg({ quality: 60, progressive: true })
      .toFile(outputPath);
      
    process.stdout.write('.');
  }
  console.log('\nCompression complete!');
}

compress().catch(console.error);
