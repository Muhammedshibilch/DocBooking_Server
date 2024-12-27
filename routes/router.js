// filepath: /backend/routes/router.js
const express = require('express');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');
const multerMiddleware = require('../middleware/multerMiddleWare');
const appointmentController = require('../controllers/appointmentController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

// Register
router.post('/register', userController.registerController);

// Login
router.post('/login', userController.loginController);

// Add doctor
router.post('/add-doctors', multerMiddleware.single('doctorImg'), doctorController.addDoctorController);

// Home doctors
router.get('/home-doctors', doctorController.getHomeDoctorsController);

// All doctors
router.get('/all-doctors', doctorController.getAllDoctorsController);

// Single doctor
router.get('/appointment/:_id', doctorController.getSingleDoctorController);

// Create appointment
router.post('/create-appointment', jwtMiddleware, appointmentController.createAppointmentController);

// Get all appointments for a specific user
router.get('/appointments', jwtMiddleware, appointmentController.getAllAppointmentsController);

// Cancel appointment
router.delete('/appointments/:id', jwtMiddleware, appointmentController.cancelAppointmentController);

// Delete doctor
router.delete('/doctors/:id', jwtMiddleware, doctorController.deleteDoctorController);

// Update user details
router.put('/user/:id', jwtMiddleware, userController.updateUserController);

// Get all appointments for admin
router.get('/appointmentss', appointmentController.getAlladminAppointments);

// delete admin appointment

module.exports = router;
