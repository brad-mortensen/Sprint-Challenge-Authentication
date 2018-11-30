const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1hr'
  }
  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  // implement user registration
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 5);

  creds.password = hash;

  db('users').insert(creds).then(ids => {
    res.status(201).json(ids);
  }).catch(err => json(err));  
}

function login(req, res) {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(200).json(token);
      }else{
        res.status(401).json({ message: 'Creds Aint Adding Up' })
      }
  }).catch(err => res.status(404).json({ error:"EEEERRRRRRRROOOROORRR", err }))
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
