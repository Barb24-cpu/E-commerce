import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5175;

app.use(cors());
app.use(express.json());

const dataDir = path.resolve('./data');
const usersFile = path.join(dataDir, 'users.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));

const readUsers = () => {
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const users = readUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: 'User already exists' });

  const user = { id: Date.now(), email, password, name: name || '' };
  users.push(user);
  writeUsers(users);

  return res.status(201).json({ message: 'Registered', user: { id: user.id, email: user.email, name: user.name } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  

  return res.json({ message: 'OK', user: { id: user.id, email: user.email, name: user.name } });
});

app.listen(PORT, () => {
  console.log(Auth API listening on http://localhost:${PORT});
});