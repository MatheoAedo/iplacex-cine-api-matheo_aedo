import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ||
'mongodb+srv://eva3_express:IFEPOrqExmL4JE94@cluster-express.irjwoto.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express';

const client = new MongoClient(uri);
let database = null;

export async function connect() {
try {
await client.connect();
database = client.db('cine-db');
console.log('Conexión a Atlas exitosa');
} catch (err) {
console.error('Error conectando a Atlas:', err.message || err);
throw err; 
}
}

export function getDb() {
if (!database) throw new Error('La base de datos no está inicializada.');
return database;
}


export { client };