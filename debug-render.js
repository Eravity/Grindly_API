#!/usr/bin/env node

// Debug script to help troubleshoot Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Render Debug Info ===');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

console.log('\n=== Directory Contents ===');
try {
  const files = fs.readdirSync('.');
  console.log('Root directory contents:', files);
  
  if (files.includes('dist')) {
    console.log('\n=== Dist Directory Contents ===');
    const distFiles = fs.readdirSync('./dist');
    console.log('Dist contents:', distFiles);
    
    if (distFiles.includes('server.js')) {
      console.log('✅ server.js found in dist/');
      const stats = fs.statSync('./dist/server.js');
      console.log('server.js size:', stats.size, 'bytes');
      console.log('server.js modified:', stats.mtime);
    } else {
      console.log('❌ server.js NOT found in dist/');
    }
  } else {
    console.log('❌ dist directory NOT found');
  }
} catch (error) {
  console.error('Error reading directories:', error.message);
}

console.log('\n=== Environment Variables ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
