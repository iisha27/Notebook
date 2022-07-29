const express=require('express');
const router =express.Router();
const User =require('../models/User');
const {body, validationResult} =require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');


const JWT_SECRET='Ishaisagoodg$irl'

//Route-1 Create a user using :Post "/api/auth/createuser" .No login required

router.post ('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('password','Password must be atleast 5 characters').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
], async (req,res)=>{

  //If there are errors return bad request and the erorrs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user= User(req.body);
    // user.save();

    //check whether the user with this email exits  already

    try{
      let user=await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).json({error:"sorry a user with this email already exists"});
      }
     const salt=await bcrypt.genSalt(10);

      const secPass=await bcrypt.hash(req.body.password, salt);
      //create a  new user
        user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email

      })
        const data={
          user:{
            id:user.id
          }
        }
      const authtoken =jwt.sign(data, JWT_SECRET);
      
    
     res.json({authtoken})
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
   
   
})

//Route-2 Authenticate a user using:POST "api/auth/login". No login required


router.post ('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
], async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}=req.body;
  try{
   let user=await User.findOne({email});
   if(!user){
    return res.status(400).json({error:"please try to login with correct credentials"});

   }

   const passwordCompare=await bcrypt.compare(password, user.password);
   if(!passwordCompare){
    return res.status(400).json({error:"please try to login with correct credentials"});
   }

   const data={
    user:{
      id:user.id
    }
   }
   const authtoken=jwt.sign(data, JWT_SECRET);
   res.json({authtoken});
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
 
}) ;


//Route-3 Get loggedin user details using: POST "api/auth/getuser". Login required


router.post ('/getuser',fetchuser, async (req,res)=>{
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  res.send(user);

}catch(error){
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}
})

module.exports=router