module.exports = (app) => 
{
  app.use('/auth', require('../Auth'));
  app.use('/api', require('../Controllers/Common'));
}