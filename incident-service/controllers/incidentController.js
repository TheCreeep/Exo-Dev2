import Incident from '../models/Incident.js';
import axios from 'axios';

export const reportIncident = async (req, res) => {
  try {
    // Find an available team
    const teamResponse = await axios.get(`${process.env.TEAM_SERVICE_URL}/api/teams/available`);
    const availableTeam = teamResponse.data;

    if (!availableTeam) {
      return res.status(404).json({ message: 'No available teams found' });
    }

    // Create incident with team assignment
    const incidentData = {
      ...req.body,
      teamId: availableTeam._id
    };

    const incident = await Incident.reportIncident(incidentData);

    // Update team availability
    await axios.patch(
      `${process.env.TEAM_SERVICE_URL}/api/teams/${availableTeam._id}/availability`,
      { availability: false }
    );

    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.fetchIncidents();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncident = async (req, res) => {
  try {
    const incident = await Incident.findOne({ id: parseInt(req.params.id) })
      .populate('callerId', 'name phone')
      .populate('operatorId', 'name')
      .populate('teamId', 'type availability');

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const incident = await Incident.editStatusIncident(parseInt(req.params.id), status);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // If incident is resolved, make team available again
    if (status === 'resolved' && incident.teamId) {
      await axios.patch(
        `${process.env.TEAM_SERVICE_URL}/api/teams/${incident.teamId}/availability`,
        { availability: true }
      );
    }

    res.status(200).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 