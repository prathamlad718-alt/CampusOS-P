/**
 * MongoDB Connection Manager
 * Handles database connection, disconnection, and health checks
 */

import mongoose from 'mongoose';

let isConnected = false;

// Suppress deprecation warnings and ensure consistent queries
mongoose.set('strictQuery', true);

// Global schema configuration to sanitize outputs safely
mongoose.plugin((schema) => {
  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });
  schema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });
});

// Listen to native driver events to prevent state drift
mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ MongoDB lost connection!');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('✅ MongoDB reconnected');
});
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import path from 'path';

let mongoServer;

export async function connectDB(uri = process.env.MONGODB_URI) {
  if (isConnected) {
    console.log('MongoDB already connected');
    return true;
  }

  try {
    let finalUri = uri;
    if (!finalUri && process.env.NODE_ENV !== 'production') {
      const dbPath = path.resolve(process.cwd(), '../.mongo-data');
      if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
      }
      mongoServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbPath,
          storageEngine: 'wiredTiger',
          dbName: 'campusos'
        }
      });
      finalUri = mongoServer.getUri('campusos');
      console.log(
        `Starting in-memory MongoDB at ${finalUri} (persistent at ${dbPath})`
      );
    } else {
      finalUri = finalUri || 'mongodb://localhost:27017/campusos';
    }

    await mongoose.connect(finalUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2
    });

    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
export async function disconnectDB() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection failed:', error.message);
    throw error;
  }
}

/**
 * Check database health
 * @returns {Promise<boolean>}
 */
export async function healthCheck() {
  try {
    const adminDb = mongoose.connection.getClient().admin();
    const result = await adminDb.ping();
    return result.ok === 1;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

/**
 * Get connection status
 * @returns {boolean}
 */
export function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export default {
  connectDB,
  disconnectDB,
  healthCheck,
  isDBConnected
};
