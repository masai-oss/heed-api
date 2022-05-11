const {Router} =  require("express");
const session = require("express-session");
// const app = express();
const loginauth = Router();

const mid = (req: { session: any; },res: any,next: any) => {
  console.log(req.session)
  next()
}

loginauth.get("",mid,(req: any,res: { send: (arg0: string) => any; }) => {
    return res.send(`
      <h1>Welcome to heed!</h1>
      <a href='/login'>Login</a>
      <a href='/register'>Register</a>

      <a href='/home'>Home</a>
      <form method="post" action="/logout">
        <button>Logout</button>
      </form>
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

  console.log(req.body)
  return res.send({
    status: 200,
    message:"Login successful"
  })

})

loginauth.post("/register",() => {
    
})

loginauth.post("/logout",() => {

})

export {loginauth}
