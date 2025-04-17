import express from 'express';
import {
  createTeam,
  getTeams,
  getTeam,
  findAvailableTeam,
  updateTeamAvailability
} from '../controllers/teamController.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/available', findAvailableTeam);
router.get('/:id', getTeam);
router.patch('/:id/availability', updateTeamAvailability);

export default router; 