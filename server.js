

// import the required modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5175;

app.use(cors());
app.use(express.json());

// define the path to the users.json file
const dataDir = path.resolve('./data');
const usersFile = path.join(dataDir, 'users.json');


// create the data directory and users.json file if they don't exist
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));


// function to read users from the users.json file
const readUsers = () => {
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}
// writing users to json file
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};


