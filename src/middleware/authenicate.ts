import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Session {
      isauth?: Boolean
    }
  }
}

const authenicateLogin = (req: Request & {session: Express.Session},res:Response,next: NextFunction) => {
    // console.log(req.session.id)
    if (!req.session.isauth) {
      res.redirect("/login");
    }
    else { 
      next()
    }
  }
  
  const authenicateHome = (req: Request & {session: Express.Session},res: Response,next: NextFunction) => {
    // console.log(req.session)
    if (req.session.isauth) {
      res.redirect("/home");
    }
    else { 
      next()
    }
  }

  export {authenicateHome,authenicateLogin}