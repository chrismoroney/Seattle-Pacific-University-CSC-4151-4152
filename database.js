// const {MongoClient} = require('mongodb');
//
// async function main(){
//     const uri = "mongodb+srv://andrewwmclainCSC415n:75@vNNhYbP9XmaV@cluster0.uueiv.mongodb.net/Users?retryWrites=true&w=majority";
//
//
//     const client = new MongoClient(uri, {useUnifiedTopology: true});
//
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//
//         // Make the appropriate DB calls
//         // await  listDatabases(client);
//
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

//list databases to test connection
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

const mongoose = require('mongoose');

// Update with your own Database URI
// const mongoDB = process.env.MONGODB_URI || 'mongodb+srv://andrewwmclain:cluster0password@cluster0.fyztf.mongodb.net/books?retryWrites=true&w=majority\n';

const mongoDB = process.env.MONGODB_URI || "mongodb+srv://andrewwmclainCSC415n:75@vNNhYbP9XmaV@cluster0.uueiv.mongodb.net/Users?retryWrites=true&w=majority";

mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(error => {
        console.log('Connection Error: ${err.message}');
    });

const db = mongoose.connection;

// Bind the console to errors, to show them on console
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

module.exports = db;