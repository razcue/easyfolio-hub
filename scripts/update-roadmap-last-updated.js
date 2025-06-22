import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roadmapPath = path.join(__dirname, '..', 'content', 'roadmap.json');

// Get today's date in YYYY-MM-DD format
const today = new Date();
const formatted = today.toISOString().slice(0, 10);

const data = JSON.parse(fs.readFileSync(roadmapPath, 'utf-8'));
data.lastUpdated = formatted;
fs.writeFileSync(roadmapPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Updated lastUpdated to ${formatted}`);