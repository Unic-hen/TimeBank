const {serviceAudit,userAudit}=require('../utils/data');
const auditUtils=require('../utils/audit');

const getServiceAudit = (req,res)=>{
    try{serviceAudit().then(data=>{
        res.send({
            code:0,
            msg:"获取服务审核列表成功",
            serviceList:data.map((item)=>{
                return {...auditUtils.findUser(item),...item}
            }),
            total:data.length,
            pageCount: 20,
        })
    })   
    }catch(err){
        res.send({
          code:0,
          msg:"获取服务审核列表失败",
          err:err
        })
    }
}
const getUserAudit = (req,res)=>{
    try{userAudit().then((data)=>{
        res.send({
          code:0,
          msg:"获取用户审核列表成功",
          userList:data,
          total:data.length,
          pageCount:20,  
        })
    })
    }catch(err){
        res.send({
          code:0,
          msg:"获取用户审核列表失败",
          err:err
        })
    }
}
module.exports={getUserAudit,getServiceAudit}