import fs from 'fs';
import path from 'path';
import { document } from './document';

const outputPath = path.join(__dirname, '../docs/openapi.json');

fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));

console.log('Document generated');
