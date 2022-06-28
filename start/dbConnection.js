import mongoose from 'mongoose';


export default function initializeDBConnection() {
    mongoose.connect(
        process.env.DBURL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        }
    )
        .then(() => console.log('Database Connected!'))
        .catch((error) => console.log(error))
}