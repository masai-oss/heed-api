const {Router} =  require("express");
const session = require("express-session");
// const app = express();
const loginauth = Router();

const authenicate = (req: { session: any; },res: any,next: any) => {
  console.log(req.session)
  next()
}

loginauth.get("",authenicate,(req: any,res: { send: (arg0: string) => any; }) => {
    const {token} = req.session;
    return res.send(`
    <h1>Welcome to heed!</h1>
    ${!token?`<a href='/login'>Login</a>
    <a href='/register'>Register</a>`:`<a href='/home'>Home</a>
    <form method="post" action="/logout">
      <button>Logout</button>
    </form>`}
      

      
    `)
})

loginauth.get("/home",(req: any,res: { send: (arg0: string) => any; }) => {

  return res.send(`
    <h1>Welcome to Home Page</h1>
  `)

})

loginauth.get("/login",(req: any,res: any) => {
   return res.send(`
     <h1>Login</h1>
     <form method="post" action="/login">
       <input type="email" name="email" placeholder="Enter your mail"/>
       <input type="password" name="password" placeholder="Enter your Password" />
       <button>Login</button>
      </form>
   `)
})

loginauth.get("/register",() => {

})

loginauth.post("/login",(req: { body: any; },res: any) => {

  try {
    // check the format of email first if not proper throw an error 

    // else check wheather email is present
    const user = await User.find({ email: req.body.email });

    // if not present throw an error 
    if (!user) return res.status(400).json({ status: "failed", message: "Provide a valid email address" })

    // else verify the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } 
    // if password not match throw an error
    else {
      res.status(400).json({ error: "Invalid Password" });
    }
    // else create a new token 
    const token = newToken(user);

    req.session.token = token;
    // return the user and the token

    return res.redirect("/home")

} catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
}
  

})

loginauth.post("/register",() => {
    
})

loginauth.post("/logout",() => {

})

export {loginauth}
