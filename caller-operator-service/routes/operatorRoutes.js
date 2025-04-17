import express from 'express';
import { createOperator, getOperators, getOperator } from '../controllers/operatorController.js';

const router = express.Router();

router.post('/', createOperator);
router.get('/', getOperators);
router.get('/:id', getOperator);

export default router; 