import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  }, 

  user: {
       additionalFields: {
          role: {
              
              defaultValue: "seeker",
            } ,
          plan : {
            defaultValue : "seeker_free"
          }
        }
    },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_ID  ,
            clientSecret: process.env.GOOGLE_SECRET 
        }
      },

  database: mongodbAdapter(db, {
    client
  }),
});