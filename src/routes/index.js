const dotenv = require('dotenv');
const { Router } = require('express');
const suscriber = require('../libs/suscriber');
const desencolarJSON = suscriber.desencolarJSON;
const router = Router();

dotenv.config();

router.get('/desencolar-dummy', async (_req, _res) => {
    desencolarJSON(process.env.QUEUE_NAME);
    return _res.sendStatus(200);

});

module.exports = router;