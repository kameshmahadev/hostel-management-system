// MongoDB backup script using mongodump
// Backups are saved in a backups/ folder with a timestamp

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MONGO_URI not set in environment variables.');
  process.exit(1);
}

const backupDir = path.resolve(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.join(backupDir, `backup-${timestamp}`);

const command = `mongodump --uri="${mongoUri}" --out="${outDir}"`;

console.log('Running backup command:', command);
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Backup failed:', error.message);
    return;
  }
  if (stderr) {
    console.error('⚠️ Backup stderr:', stderr);
  }
  console.log('✅ Backup completed successfully!');
  console.log('Backup saved to:', outDir);
});
