import mongoose from 'mongoose';
import MongoInternalException from '../exception/MongoInternalException.js';

export default async (req, res, next) => {
  
  const activityId = req.params["id"];

  try {
    if (!mongoose.Types.ObjectId.isValid(activityId)) { 
      const error = new MongoInternalException('Invalid ID format',400400)   
      error.status = 400;
      throw error
    }
    next();
  } catch (error) {
    console.error("Errore message: " + error.message, "- status: " + error.status, "- code: " + error.code);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
  
}
