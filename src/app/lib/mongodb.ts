import mongoose from "mongoose";

let isConnected: boolean = false;


export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
        dbName:'privacyanalyser',
    })
    isConnected = true;
;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
