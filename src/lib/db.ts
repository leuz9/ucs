import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  console.log('Initializing new MongoDB connection...');
  console.log('MongoDB URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Masquer le mot de passe

  const opts = {
    serverApi: { 
      version: '1', 
      strict: true, 
      deprecationErrors: true 
    }
  };

  try {
    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts);
    cached.conn = await cached.promise;
    
    // Logs détaillés après la connexion
    console.log('MongoDB Connection Details:');
    console.log('- Connection State:', mongoose.connection.readyState);
    console.log('- Database Name:', mongoose.connection.name);
    console.log('- Host:', mongoose.connection.host);
    console.log('Successfully connected to MongoDB!');
    
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectDB;