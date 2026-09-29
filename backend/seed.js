import crypto from 'node:crypto';
import { promisify } from 'node:util';
import mongoose from 'mongoose';
import { connectDB } from './src/database/connection.js';
import { User } from './src/database/schemas/user.schema.js';

const scryptAsync = promisify(crypto.scrypt);

async function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

const usersToSeed = [
  {
    name: 'Admin User',
    email: 'admin@campus.edu',
    password: 'Password123',
    isSuperAdmin: true
  },
  {
    name: 'Teacher User',
    email: 'teacher@campus.edu',
    password: 'Password123',
    isSuperAdmin: false
  },
  {
    name: 'Student User',
    email: 'student@campus.edu',
    password: 'Password123',
    isSuperAdmin: false
  }
];

async function seed() {
  console.log('Connecting to running DB on port 27017...');
  await mongoose.connect('mongodb://127.0.0.1:27017/campusos');

  console.log('Seeding users...');
  for (const u of usersToSeed) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      const passwordHash = await createPasswordHash(u.password);
      await User.create({
        name: u.name,
        email: u.email,
        passwordHash,
        isSuperAdmin: u.isSuperAdmin
      });
      console.log(`✅ Created: ${u.email} / ${u.password}`);
    } else {
      console.log(`⚠️ Skipped (already exists): ${u.email}`);
    }
  }

  console.log('Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
