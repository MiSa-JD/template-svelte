import fs from 'node:fs';
import path from 'node:path';

export const httpsConfig = {
  key: fs.readFileSync(path.resolve('./ssl/localhost.key')),
  cert: fs.readFileSync(path.resolve('./ssl/localhost.crt')) 
};