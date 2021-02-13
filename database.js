const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://andrewwmclainCSC415n:75@vNNhYbP9XmaV@cluster0.uueiv.mongodb.net/Users?retryWrites=true&w=majority";


    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
//list databases to test connection
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };