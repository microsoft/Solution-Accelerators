// scripts/generate-card-data.js
import fs from 'fs';
import path from 'path';

const inputDir = path.resolve('src/data/cards'); // folder with individual .json files
const outputDir = path.resolve('src/data/generated');
const outputFile = path.resolve('src/data/generated/cards.json');

// Create the generated directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const cardFiles = fs.readdirSync(inputDir).filter((file) => file.endsWith('.json'));

const cards = cardFiles.map((file) => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');
  return JSON.parse(content);
});

fs.writeFileSync(outputFile, JSON.stringify(cards, null, 2));
console.log(`✅ Generated cards.json with ${cards.length} entries`);
