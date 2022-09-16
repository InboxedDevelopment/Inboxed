import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_CONNECTION_URI

if (uri === undefined) {
    console.error(`\n\n\x1b[31;40;1mERROR: MONGODB_CONNECTION_URI NOT PROVIDED\x1b[0m\n\n`)
    process.exit(1)
}

//@ts-ignore
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default client