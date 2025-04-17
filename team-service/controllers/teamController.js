import Team from '../models/Team.js';

export const createTeam = async (req, res) => {
  try {
    const team = await Team.createNewTeam(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.fetchTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ id: parseInt(req.params.id) });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAvailableTeam = async (req, res) => {
  try {
    const team = await Team.findAvailableTeam();
    if (!team) {
      return res.status(404).json({ message: 'No available teams found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const team = await Team.updateTeamAvailability(parseInt(req.params.id), availability);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 