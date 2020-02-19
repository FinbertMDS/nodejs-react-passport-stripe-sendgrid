const keys = require('../config/key');

var HttpsProxyAgent = require('https-proxy-agent');
var httpsProxyAgent;
if (process.env['https_proxy']) {
    httpsProxyAgent = new HttpsProxyAgent(process.env['https_proxy']);
}
const stripe = require('stripe')(keys.stripeSecretKey);
stripe.setHttpAgent(httpsProxyAgent);

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      var name = req.body.email.substring(0, req.body.email.indexOf("@"));
      const customer = await stripe.customers.create({
        description: name + ' charged 10$',
        email: req.body.email,
        name: name,
      });

      const charge = await stripe.charges.create({
        amount: 1000,
        currency: 'usd',
        description: '10$ for 10 credits',
        source: req.body.id
      });

      req.user.credits += 10;
      const user = await req.user.save();
  
      res.send(user);
    } catch (error) {
      // console.log(error);
    }
  });
  app.get('/api/charges', requireLogin, async (req, res) => {
    try {
      const charges = await stripe.charges.list({
        limit: 10
      });
  
      res.send(charges);
    } catch (error) {
      // console.log(error);
    }
  });
  app.get('/api/customers', requireLogin, async (req, res) => {
    try {
      const customers = await stripe.customers.list({
        limit: 10
      });
  
      res.send(customers);
    } catch (error) {
      // console.log(error);
    }
  });
};