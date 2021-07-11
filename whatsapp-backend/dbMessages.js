import mongoose from 'mongoose';

// Data Schema
const whatsappSchema = mongoose.Schema({
    "message": String,
    "name": String,
    "timestamp": String,
    "received": Boolean
});

export default mongoose.model('messagecontents',whatsappSchema);