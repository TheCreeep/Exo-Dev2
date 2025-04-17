import Caller from '../models/Caller.js';

export const createCaller = async (req, res) => {
  try {
    const caller = await Caller.createNewCaller(req.body);
    res.status(201).json(caller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCallers = async (req, res) => {
  try {
    const callers = await Caller.fetchCallers();
    res.status(200).json(callers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaller = async (req, res) => {
  try {
    const caller = await Caller.findOne({ id: parseInt(req.params.id) });
    if (!caller) {
      return res.status(404).json({ message: 'Caller not found' });
    }
    res.status(200).json(caller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 