function index(req, res) {
  res.json({
    message: 'Welcome to our Food Tracking app!',
    documentation_url: 'https://github.com/emamiali/project1',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}


module.exports = {
  index: index
}
