import * as dotenv from "dotenv";
dotenv.config()
import { Router,Request,Response } from "express";
import bcrypt from "bcrypt";
import { authenicateHome, authenicateLogin } from "../../middleware/authenicate";
import {Users} from "../../models/user.model"

const loginauth = Router();


const {SESS_NAME = "sessionid",JWT_ACCESS_KEY="shivam"} = process.env

// const Users = [
//   {id:1,name:"shivam",email:"shivam@gmail.com",password:'password'},{id:2,name:"shiva",email:"shiva@gmail.com",password:'password'},{id:3,name:"pandey",email:"pandey@gmail.com",password:'password'},{id:4,name:"aditya",email:"aditya@gmail.com",password:'password'}
// ]


loginauth.get("",(req: Request&{session: Express.Session},res: Response) => {
    const {isauth} = req.session;
    return res.send(`
    <h1>Welcome to heed!</h1>
    ${!isauth?`<a href='/login'>Login</a>
    <a href='/register'>Register</a>`:`<a href='/home'>Home</a>
    <form method="post" action="/logout">
      <button>Logout</button>
    </form>`}
    `)
})

loginauth.get("/home",authenicateLogin,(req: Request,res: Response ) => {

  return res.send(`
    <h1>Welcome to Home Page</h1>
    <a href='/'>Main Page</a>
  `)
})

loginauth.get("/login",authenicateHome,(req: Request,res: Response) => {
   return res.send(`
     <h1>Login</h1>
     <form method="post" action="/login">
       <input type="email" name="email" placeholder="Enter your mail"/>
       <input type="password" name="password" placeholder="Enter your Password" />
       <input type="submit" value="Login">
      </form>
      <a href='/register'>Register</a>
   `)
})

loginauth.get("/register", authenicateHome, (req: Request, res: Response) => {
  return res.send(`
  <h1>REgister</h1>
  <form method="post" action="/register">
    <input name="name" placeholder="Enter your Name" />
    <input type="email" name="email" placeholder="Enter your mail"/>
    <input type="password" name="password" placeholder="Enter your Password" />
    <input type="submit" value="Register">
   </form>
   <a href='/login'>Login</a>
  `)
})

loginauth.post("/login", authenicateHome, async (req: Request & {session: Express.Session},res: Response) => {

  try {
    // check the format of email first if not proper throw an error 

    // else check wheather email is present
    const user = await Users.findOne({ email: req.body.email }).lean().exec();

    // if not present throw an error 
    if (!user) return res.status(400).json({ status: "failed", message: "Provide a valid email address" })

    // else verify the password
    const match = await user.checkpassword(req.body.password);
    
        // if not match then throw an error
        if (!match) return res.status(400).json({ status: "failed", message: "Please provide correct email address and password" })
   
       res.status(200).json({ message: "Successfully login" });
       // else create a authenicate the user
       req.session.isauth = true;

       return res.redirect("/home")

   

  } catch (e:any) {
    return res.status(500).json({ status: "failed", message: e.message });
}
  
})

loginauth.post("/register", authenicateHome, async (req: Request & {session: Express.Session},res: Response) => {
  
  const { name, email, password } = req.body;

  if (name && email && password) {
    let user = await Users.findOne({email:email})

    if (!user) {
      
      //uncommented when link to DB
      user = await Users.create(req.body)

      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(password, salt);
    
      // authenicate the user 
      
      req.session.isauth = true;
        
      return res.redirect("/home")
    }
    
  }

  return res.redirect("/register") //todo error message
    
})

loginauth.post("/logout", authenicateLogin, (req: Request, res: Response) => {
  req.session.destroy((error: Error)  => {
    if (error) {
      return res.redirect("/home")
    }
    res.clearCookie(SESS_NAME);
    res.redirect("/login");
  })
})

export {loginauth}
