const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Data
const projects   = require('./data/projects.json');
const skills     = require('./data/skills.json');
const experience = require('./data/experience.json');

// ── Routes ────────────────────────────────────────────────────────────────────

app.get('/api/projects', (req, res) => {
  res.json({ status: 'OK', data: projects });
});

app.get('/api/skills', (req, res) => {
  res.json({ status: 'OK', data: skills });
});

app.get('/api/experience', (req, res) => {
  res.json({ status: 'OK', data: experience });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ status: 'ERROR', message: 'All fields required.' });
  }
  // In production: send email / save to DB here
  console.log(`[TRANSMISSION RECEIVED] From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  setTimeout(() => {
    res.json({ status: 'OK', message: 'Transmission received. Will respond within 24hrs.' });
  }, 800);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ONLINE', uptime: process.uptime(), timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`[SERVER] ONLINE :: PORT ${PORT}`);
});
