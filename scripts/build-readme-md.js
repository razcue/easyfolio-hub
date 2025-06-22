import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the common.json as the single source of truth
const common = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'content', 'common.json'), 'utf8')
);

let template = fs.readFileSync(
    path.join(__dirname, '..', 'content', 'templates', 'readme.template.md'),
    'utf8'
);

// Replace placeholders
Object.keys(common).forEach(key => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), common[key]);
});

fs.writeFileSync(path.join(__dirname, '..', 'README.md'), template);