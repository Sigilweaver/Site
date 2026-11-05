/**
 * Writes dist/llms.txt (https://llmstxt.org) after `vite build`, from the
 * project catalog.
 */

import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES, PROJECTS, projectsIn } from '../src/site/projects.ts';

const outDir = join(import.meta.dirname, '..', 'dist');
const domain = 'https://sigilweaver.app';

const plain = (s: string) => s.replace(/[`[\]]/g, '');

const sections = CATEGORIES.map((c) => {
    const lines = projectsIn(c.id).map((p) => {
        const links = [`page: ${domain}/${p.slug}/`];
        if (p.docs) links.push(`docs: ${domain}${p.docs}`);
        links.push(`source: ${p.repo}`);
        return `- [${p.name}](${domain}${p.docs ?? `/${p.slug}/`}): ${plain(p.tagline)} License ${p.license}. ${plain(p.status)} (${links.join(', ')})`;
    });
    return `## ${c.title}\n\n${lines.join('\n')}`;
});

const content = `# Sigilweaver

> Open specifications and clean-room Rust and Python readers for proprietary file formats in mass spectrometry, business software and medical imaging, plus Loom, a self-hosted visual data pipeline tool. ${PROJECTS.length} projects; Apache-2.0 unless noted.

Each project lists its known limitations in its README; the summaries below include the most important ones.

${sections.join('\n\n')}

## Other

- [Documentation hub](${domain}/docs/): links to every project's documentation.
- [Blog](${domain}/blog/): engineering notes and project updates.
`;

if (!existsSync(outDir)) {
    throw new Error('dist/ does not exist; run `vite build` before generating llms.txt');
}
writeFileSync(join(outDir, 'llms.txt'), content, 'utf8');
console.log('Generated dist/llms.txt');
