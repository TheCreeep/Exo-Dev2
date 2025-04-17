import express from 'express';
import {
  reportIncident,
  getIncidents,
  getIncident,
  updateIncidentStatus
} from '../controllers/incidentController.js';

const router = express.Router();

router.post('/', reportIncident);
router.get('/', getIncidents);
router.get('/:id', getIncident);
router.patch('/:id/status', updateIncidentStatus);

export default router; 