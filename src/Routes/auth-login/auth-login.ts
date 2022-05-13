require("dotenv").config();
const { Router } = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const loginauth = Router();
const jwt = require("jsonwebtoken");



const {SESS_NAME = "sid",JWT_ACCESS_KEY="shivam"} = process.env

const Users = [
  {id:1,name:"shivam",email:"shivam@gmail.com",password:'password'},{id:2,name:"shiva",email:"shiva@gmail.com",password:'password'},{id:3,name:"pandey",email:"pandey@gmail.com",password:'password'},{id:4,name:"aditya",email:"aditya@gmail.com",password:'password'}
]

const newToken = (user) => {
    return jwt.sign({ user },JWT_ACCESS_KEY)
}

const authenicatelogin = (req: { session: any; },res: any,next: any) => {
  console.log(req.session)
  if (!req.session.token) {
    res.redirect("/login");
  }
  else { 
    next()
  }
}

const authenicatehome = (req: { session: any; },res: any,next: any) => {
  console.log(req.session)
  if (req.session.token) {
    res.redirect("/home");
  }
  else { 
    next()
  }
}

loginauth.get("",(req: any,res: { send: (arg0: string) => any; }) => {
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

loginauth.get("/home",authenicatelogin,(req: any,res: { send: (arg0: string) => any; }) => {

  return res.send(`
    <h1>Welcome to Home Page</h1>
  `)

})

loginauth.get("/login",authenicatehome,(req: any,res: any) => {
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

loginauth.get("/register", authenicatehome, (req: any, res: { send: (arg0: string) => any; }) => {
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

loginauth.post("/login", authenicatehome, async (req: { body: any; session: any; },res: any) => {

  try {
    const { email, password } = req.body;
    // check the format of email first if not proper throw an error 

    // else check wheather email is present
    const user = Users.find(user => user.email==email && user.password == password );

    // if not present throw an error 
    if (!user) return res.status(400).json({ status: "failed", message: "Provide a valid email address" })

    // comment out when linked to DB 

    // // else verify the password
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (validPassword) {
    //   res.status(200).json({ message: "Successfully login" });
    // } 
    // // if password not match throw an error
    // else {
    //   res.status(400).json({ error: "Invalid Password" });
    // }
    // else create a new token 
    const token = newToken(user);

    req.session.token = token;
    // return the user and the token

    return res.redirect("/home")

} catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
}
  

})

loginauth.post("/register", authenicatehome, async (req: any, res: any) => {
  
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = Users.some(
      user => user.email == email
    )

    if (!exists) {
      const user = {
        id: Users.length + 1,
        name,
        email,
        password
      }
      //uncommented when link to DB

      // const salt = await bcrypt.genSalt(10);
      // // now we set user password to hashed password
      // user.password = await bcrypt.hash(user.password, salt);
    

      //  await Users.push(user);

        // create the token

      const token = newToken(user);
      req.session.token = token;
      return res.redirect("/home")
    }
    
  }

  return res.redirect("/register") //todo error message
    
})

loginauth.post("/logout", authenicatelogin, (req: any, res: any) => {
  req.session.destroy(error => {
    if (error) {
      return res.redirect("/home")
    }
    res.clearCookie(SESS_NAME);
    res.redirect("/login");
  })
})

export {loginauth}
