// Збирає папку www/ для Android-застосунку з файлів PWA
import { mkdirSync, copyFileSync, rmSync } from 'node:fs';
const files = ['index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of files) copyFileSync(f, `www/${f}`);
console.log('www/ готово:', files.join(', '));
