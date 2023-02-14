const dotenv = require('dotenv');
const { Router } = require('express');
const publisher = require('../libs/suscriber');
const desencolarJSON = publisher.desencolarJSON;
const router = Router();

dotenv.config();

router.get('/desencolar-dummy', async (_req, _res) => {
    desencolarJSON(process.env.QUEUE_NAME)
    return _res.sendStatus(200);

});

module.exports = router;