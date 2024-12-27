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
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
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

// Get all appointments for admin
exports.getAlladminAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('userId', 'username'); // Populate user details
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};


// delte admin appointment
// exports.deleteAppointment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAppointment = await Appointment.findByIdAndDelete(id);
//     if (!deletedAppointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.status(200).json({ message: 'Appointment deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting appointment:', error);
//     res.status(500).json({ message: 'Failed to delete appointment' });
//   }
// };
// Cancel admin appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Failed to cancel appointment' });
  }
};
