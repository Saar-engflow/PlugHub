// controllers/adminController.js
const Service = require('../models/Service');

exports.approveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
