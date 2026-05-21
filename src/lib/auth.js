import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error("DB_URI missing");
}

/* ======================
   MONGO CONNECTION (SAFE)
====================== */

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

/* ======================
   AUTH EXPORT
====================== */

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise, {
    dbName: "idea_vault",
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

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },

  //  VERY IMPORTANT FOR YOUR ERROR
  trustedOrigins: [
    "http://localhost:3000",
    "https://ideavault-client-tawny.vercel.app",
  ],
});