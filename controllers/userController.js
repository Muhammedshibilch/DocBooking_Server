const users = require('../models/userModel');
const jwt = require('jsonwebtoken')

// Register
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({email});
        if (existingUser) {
            res.status(406).json("User already exists ... please Login!");
        } else {
            const newUser = new users({
                username,
                email,
                password,
                phonenumber:""
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(err);
    }
};


// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    console.log( email, password);

    try {
        const existingUser = await users.findOne({email,password});
        if (existingUser) {
            // token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                users:existingUser,
                token
            })
        } else {
          res.status(404).json("Invalid Email/ Password")
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.updateUserController = async (req, res) => {
    const userId = req.params.id;
    const { username, email, phonenumber } = req.body;
  
    try {
      const updatedUser = await users.findByIdAndUpdate(
        userId,
        { username, email, phonenumber },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Error updating user details:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
