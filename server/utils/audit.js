const data=require('./data')
const findUser=async({phone})=>{
    const users=await data.getUsers()
    return users.filter(item=>item.phone==phone)[0]
}

module.exports={findUser}

