import express from "express";
import { healthCheck,loginauth } from "./Routes";
import session from "express-session";
import bodyParser from "body-parser";

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
    resave: false,
    saveUninitialized:false,
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
