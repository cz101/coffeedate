// connection to db 
// insert the data to the table 
require('dotenv').config();

const {MongoClient} = require('mongodb');
async function main() {
  
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */


const dbuser = process.env.dbusername;
const password = process.env.dbpassword;

console.log('dbuser:' + dbuser + " pass: " +password)

const uri = `mongodb+srv://${dbuser}:${password}@cluster0.ups2ujp.mongodb.net/`;//todo need env to parse
  const client = new MongoClient(uri);
 
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);