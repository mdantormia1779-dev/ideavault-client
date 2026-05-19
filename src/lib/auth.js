import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
//  Global client (Next.js এ multiple connection avoid করতে)
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.DB_URI;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

//  DB setup
const db = (await clientPromise).db("idea_vault");

//  better-auth config
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: await clientPromise,
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  // optional but recommended
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
});