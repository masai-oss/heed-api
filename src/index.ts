import express from "express";
import { healthCheck,loginauth } from "./Routes";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from 'connect-mongodb-session';
import { MongoClient, MongoClientOptions } from 'mongodb';

declare function ConnectMongoDBSession(fn: typeof session): typeof ConnectMongoDBSession.MongoDBStore;

declare namespace ConnectMongoDBSession {
    class MongoDBStore extends session.Store {
        constructor(connection?: MongoDBSessionOptions, callback?: (error: Error) => void);
        client: MongoClient;

        get(sid: string, callback: (err: any, session?: session.SessionData | null) => void): void;
        set(sid: string, session: session.SessionData, callback?: (err?: any) => void): void;
        destroy(sid: string, callback?: (err?: any) => void): void;
        all(callback: (err: any, obj?: session.SessionData[] | { [sid: string]: session.SessionData; } | null) => void): void;
        clear(callback?: (err?: any) => void): void;
    }

    interface MongoDBSessionOptions {
        uri: string;
        collection: string;
        expires?: number | undefined;
        databaseName?: string | undefined;
        connectionOptions?: MongoClientOptions | undefined;
        idField?: string | undefined;
    }
}

const MongoDBStore = connectMongo(session)
let store = new MongoDBStore({
  uri: `mongodb+srv://naukri:${process.env.MONGODB_PASSWORD}@cluster0.u9tan.mongodb.net`,
  collection: 'mySessions'
}, (err) => {
  console.log(err)
});

store.on('connected', () => {
  store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function(err) {
  console.log(err);
});

const app = express();

const TWO_HOURS = 1000*60*60*2;

const {
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = "development",
    SESS_NAME = "sid",
    SESS_SECRET = "shivam!aditya!pandey"
} = process.env;

const IN_PROD = NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({

    name: SESS_NAME,
    resave: true,
    store,
    saveUninitialized:true,
    secret:SESS_SECRET,
    cookie: {
      sameSite: true ,
      secure: IN_PROD,
      // maxAge: SESS_LIFETIME,
    }
}))

app.use("/v1", healthCheck);
app.use("/",loginauth);

app.listen(8080, () => {
  console.log("Server started at http://localhost:8080/");
});
