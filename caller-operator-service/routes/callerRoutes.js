import express from 'express';
import { createCaller, getCallers, getCaller } from '../controllers/callerController.js';

const router = express.Router();

router.post('/', createCaller);
router.get('/', getCallers);
router.get('/:id', getCaller);

export default router; 