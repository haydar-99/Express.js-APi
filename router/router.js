const express = require("express");
const router = express.Router()
const schema = require("../modules/schema")


const findUserById = async (req,res, next) =>{
    let user;
    try{
        
         user = await schema.findById({_id: req.params.id})
        .then(rslt =>{console.log(rslt);return rslt;})
        
         if(user == null )res.send(  "user not found");
         else{res.user= user}
        }
        catch (error) {
            console.log(error)
            res.send({sucess: false, msg: error })
            
        }
        next();
        

}



router.get("/", async (req,res)=>{
    try {
         const users = await schema.find().
         then( reslut=>{console.log(reslut);return reslut;}).
         catch((err)=>{console.log(err.message)})
         res.send(users)
    } catch (error) {
        res.send(error.message)
    }
   
})

router.get("/:id", findUserById ,async (req,res) =>{
    try{
        const {user} = res
        res.json(user)
        
       
    }
    catch(err){
        res.send({sucess: false, msg: error })
    }
})



router.post("/", async(req,res) =>{
    try {
        
        const newUser = await new schema({name:req.body.name, age: Number(req.body.age)})
        await newUser.save()
        console.log(newUser)
        res.json( "new user is created " + newUser)
        
    } catch (error) {
        res.send({sucess: false, msg: error })
        
    }
} )


router.delete("/:id", findUserById, async(req,res)=> {
    const {user} = res
    try{
        await user.remove()
        res.json({message: "the user was found and deleted"})
}
    catch(err){
        console.log(err)
        res.json(err.message)
    }
    

    
})

router.patch("/:id", findUserById,async (req,res)=> {
    const {user} = res;
    if(user.name !== null){user.name =req.body.name}
    if(user.age !== null){user.age =req.body.age}
    try {
       const updatedUser =  await user.save();
        res.json({updatedUser})
    } catch (error) {
        res.json({error})
        
    }
})

module.exports = router
