import Operator from '../models/Operator.js';

export const createOperator = async (req, res) => {
  try {
    const operator = await Operator.createNewOperator(req.body);
    res.status(201).json(operator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOperators = async (req, res) => {
  try {
    const operators = await Operator.fetchOperators();
    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOperator = async (req, res) => {
  try {
    const operator = await Operator.findOne({ id: parseInt(req.params.id) });
    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    res.status(200).json(operator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 