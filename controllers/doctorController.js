const doctors = require('../models/doctorModel');

// add-doctors
exports.addDoctorController = async (req, res) => {
  console.log("Inside addDoctorController");
  const { doctorName, doctorEmail, experience, address1, address2, aboutDoctor, speciality, degree, fees } = req.body;
  const doctorImg = req.file.filename;

  try {
    const existingDoctor = await doctors.findOne({ doctorEmail });
    if (existingDoctor) {
      res.status(406).json("Doctor already exists. Please upload another.");
    } else {
      const newDoctor = new doctors({
        doctorName,
        doctorEmail,
        experience,
        address1,
        address2,
        aboutDoctor,
        speciality,
        degree,
        fees,
        doctorImg
      });
      await newDoctor.save();
      res.status(200).json(newDoctor);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
// get home doctors
exports.getHomeDoctorsController = async(req,res)=>{
  console.log("Inside getHomeDoctorsController");
  try{
    const allHomeDoctors = await doctors.find().limit(4)
    res.status(200).json(allHomeDoctors)
  }catch(err){
    res.status(401).json(err)
  }
  
}

exports.getAllDoctorsController = async(req,res)=>{
  console.log("Inside getAllDoctorsController");
  try{
    const allDoctors = await doctors.find()
    res.status(200).json(allDoctors)
  }catch(err){
    res.status(401).json(err)
  }
  
}


exports.getSingleDoctorController = async(req,res)=>{
  console.log("Inside getSingleDoctorController");
  try{
    const{ _id } = req.params
    const result = await doctors.findById(_id);
    if(!result){
      return res.status(404).json("doctor not found")
    }
    res.status(200).json(result);

  }catch(err){
    console.log(err);
    res.status(500).json("Internal Server error")
    
  }
  
}

exports.deleteDoctorController = async (req, res) => {
  const doctorId = req.params.id;

  try {
    await doctors.findByIdAndDelete(doctorId);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};