// insert the data to the table 
require('dotenv').config();

async function connectdb() {
  const {MongoClient} = require('mongodb');
  const dbuser = process.env.dbusername;
  const password = process.env.dbpassword;
  const connectionStr = `mongodb+srv://${dbuser}:${password}@cluster0.ups2ujp.mongodb.net/`;
  const client = new MongoClient(connectionStr);
  const dbName = "coffeedateuser";
  //async function run() 
  {
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      //await  listDatabases(client);

     // db = connect( 'mongodb+srv://${dbuser}:${password}@cluster0.ups2ujp.mongodb.net/coffeedateuser' );
  
      const db = client.db(dbName);
      const col = db.collection("user");
    //   let personDocument = {
    //     "name": { "first": "Alan1", "last": "Turing1" },
    //     "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
    //     "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
    //     "contribs": [ "Turing machine", "Turing test", "Turingery" ],
    //     "views": 1250000
    // }
   // const p = await col.insertOne(personDocument);
    const filter = { "Lastname": "Zeng" };
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document));
      // Make the appropriate DB calls
      //

  } catch (e) {
      console.error(e.stack);
  } finally {
      await client.close();
      console.log("the db connection is closed");
  }

  }
 
}

//  async function listDatabases(client){
//   try { databasesList = await client.db().admin().listDatabases();
//   //console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   } catch (e) { console.error(e);}
//   finally {
//     await client.close();
//   }
// };
//run().catch(console.dir);
connectdb()
