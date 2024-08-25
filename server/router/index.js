const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const service=require("../controller/service")
const audit=require("../controller/audit")
const mw=require("../utils/middleWare")
const userUtils=require("../utils/user")

const validToken=userUtils.validToken

router.post("/login", user.login);

router.post("/register", user.register);

router.use((req, res, next) => {
    const token = req.header('token');
    if (!token) {
      return res.status(401).send({
        msg:"Unauthorized",
      });
    
    }else if(validToken(token)===false){
      return res.status(401).send({
        msg:"authorized Wrong",
      })
    }
    next();
  })

router.get("/logout", user.logout);

router.post("/userinfo", user.updateUser);

router.post("/logoff", user.logoff);

// 

router.post("/service",service.service)

router.delete("/service/delete",service.deleteService)

router.delete("/service/update",service.updateService)

// 

router.get("/serviceList",service.getServices)

router.post("/volunteerSignUp",service.volunteerSignUp)

router.get("/historyList",service.getHistory)

router.get("/historyServiceList",service.getHistory)

// 

router.get("/audit/userList",audit.getUserAudit)

router.get("/audit/serviceList",audit.getServiceAudit)



router.get("/test", user.test);



module.exports = router;
