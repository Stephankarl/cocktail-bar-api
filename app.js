require('dotenv').config();

const express = require('express');
const app = express();

//App config
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

//Requiring Route Files
const cocktailRoutes = require('./routes/cocktails');
const liquorRoutes = require('./routes/liquor');
const mixerRoutes = require('./routes/mixers');
const garnishRoutes = require('./routes/garnish');
const optionRoutes = require('./routes/optional');
const glassRoutes = require('./routes/glasses');
const barRoutes = require('./routes/bar');

//Connecting Routers
app.use('/api/cocktails', cocktailRoutes);
app.use('/api/liquor', liquorRoutes);
app.use('/api/mixers', mixerRoutes);
app.use('/api/garnish', garnishRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/glasses', glassRoutes);
app.use('/api/bar', barRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on ${process.env.PORT || 5000}`)
);
