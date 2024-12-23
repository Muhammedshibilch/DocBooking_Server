// filepath: /backend/controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');

// Create appointment
exports.createAppointmentController = async (req, res) => {
  const { userId, doctorImg, speciality, doctorName, address1, address2, appointmentDate, appointmentTime } = req.body;

  try {
    const newAppointment = new Appointment({
      userId,
      doctorImg,
      speciality,
      doctorName,
      address1,
      address2,
      appointmentDate,
      appointmentTime,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all appointments for a specific user
exports.getAllAppointmentsController = async (req, res) => {
  const userId = req.userId;

  try {
    const allAppointments = await Appointment.find({ userId });
    res.status(200).json(allAppointments);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};

// Cancel appointment
exports.cancelAppointmentController = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling appointment:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

