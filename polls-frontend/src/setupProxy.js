const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/polls',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',  // Flask backend URL
      changeOrigin: true,
    })
  );
};
