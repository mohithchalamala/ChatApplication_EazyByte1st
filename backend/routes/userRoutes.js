const router = require('express').Router()
const Usermodel = require('../User_model')

//creating user
router.post('/', async(req, res)=> {
    try {
      const {name, email, password, picture} = req.body;
      console.log(req.body);
      const user = await Usermodel.create({name, email, password, picture});
      res.status(201).json(user);
    } catch (e) {
      let msg;
      if(e.code == 11000){
        msg = "User already exists"
      } else {
        msg = e.message;
      }
      console.log(e);
      res.status(400).json(msg)
    }
  })


//login user

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await Usermodel.FindByCredentials(email, password)
        user.status = 'online'
        await user.save()
        res.json(user)
    } catch (error) {
        res.json(error.message)
    }
})


module.exports = router