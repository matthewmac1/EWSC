const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

app.use(express.json());

//DB config
const db = config.get('mongoURI');

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  app.use('/api/teams', require('./routes/api/teams'));
  //app.use('/api/users', require('./routes/api/users'));
  app.use('/api/players', require('./routes/api/players'));
  //app.use('/api/auth', require('./routes/api/auth'));

  //Serve static assets if in production
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server started on ${port}`));
