const express = require('express');
const sequelize = require('./common/database');
const functionsRoutes = require('./functions/routes');
const librariesRoutes = require('./libraries/routes');
const jobsRoutes = require('./jobs/routes');
const schedulersRoutes = require('./schedulers/routes');
const init = require("./common/init");

//create db
sequelize.sync();

//create www server
const app = express();
app.use(express.json());
app.use('/', functionsRoutes);
app.use('/', librariesRoutes);
app.use('/', jobsRoutes);
app.use('/', schedulersRoutes);

//initiate globals
init.initlib();
init.initfn();
init.initsch();

//general routes
app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

//handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong'
  });
});


//start www server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
