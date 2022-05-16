const authenicatelogin = (req: { session: any; },res: any,next: any) => {
    // console.log(req.session.id)
    if (!req.session.isauth) {
      res.redirect("/login");
    }
    else { 
      next()
    }
  }
  
  const authenicatehome = (req: { session: any; },res: any,next: any) => {
    // console.log(req.session)
    if (req.session.isauth) {
      res.redirect("/home");
    }
    else { 
      next()
    }
  }

  export {authenicatehome,authenicatelogin}