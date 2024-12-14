import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

//contact Warren for URI key
const MONGO_URI = process.env.MONGO_URI_KEY!;

//when server initializes, check server terminal for DB connection confirmation
function dbConnect() {
mongoose
    .connect(MONGO_URI, { dbName: 'a11yRoot' })
    .then(() => {
        console.log('Connected to Database.');
    })
    .catch((err)=> {
        console.log(`Database connection error: ${err}`)
    });

}

export default dbConnect;
