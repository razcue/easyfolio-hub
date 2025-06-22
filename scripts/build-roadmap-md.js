import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roadmapPath = path.join(__dirname, '..', 'content', 'roadmap.json');
const commonPath = path.join(__dirname, '..', 'content', 'common.json');
const outputPath = path.join(__dirname, '..', 'docs', 'ROADMAP.md');

function sectionToMarkdown(sec) {
    return `### ${sec.emoji} ${sec.title}
${sec.items.map(item => `- ${item}`).join('\n')}
`;
}

function quarterToMarkdown(q) {
    return `## 📍 ${q.label}

${q.sections.map(sectionToMarkdown).join('\n')}
`;
}

function futureIdeaToMarkdown(sec) {
    return `### ${sec.emoji} ${sec.title}
${sec.items.map(item => `- ${item}`).join('\n')}
`;
}

function main() {
    const data = JSON.parse(fs.readFileSync(roadmapPath, 'utf-8'));
    const common = JSON.parse(fs.readFileSync(commonPath, 'utf-8'));
    let md = `# 🗺️ EasyFolio Roadmap

_Last updated: ${data.lastUpdated}_

---
`;

    md += data.quarters.map(quarterToMarkdown).join('\n---\n');

    md += `\n---\n\n## 📦 Future Ideas\n\n`;

    md += data.futureIdeas.map(futureIdeaToMarkdown).join('\n\n');

    // Use common.shortDescription as the footer
    md += `\n---\n\n> _${common.shortDescription}_\n`;

    fs.writeFileSync(outputPath, md);
}

main();