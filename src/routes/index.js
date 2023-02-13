const dotenv = require('dotenv');
const { Router } = require('express');
const { obtenerDatosDummy } = require('../libs/dummy_request_handler');
const suscriber = require('../libs/suscriber');
const publisher = require('../libs/suscriber');
const encolarJSON = suscriber.encolarJSON;
const desencolarJSON = publisher.desencolarJSON;
const router = Router();

dotenv.config();

router.get('/', (_req, _res) => {
    return _res.json({ id_transaccion_canal: 'asdasd-asdasd-asdasd-asdasd', importe: 1000.23, id_cuenta: '00011122233344455566677788899922' });
});

/**
 * ya tengo una funcion que recibe el resultado del get y lo procesa ahora tengo que hacer que lo envie por una cola.
 * Igualmente acá deberia organizar mejor mis funciones para que no quede todo apilado. Este deberia ser el producer (sender)
 * y deberia tener otro proyecto con el consumer (receiver).
 */
router.get('/obtener-dummy-modificado', async (_req, _res) => {
    try {
        const datosDummy = await obtenerDatosDummy();
        return _res.json({ datosDummy });
    } catch (error) {
        _res.status(500).send(error.message);
    }
});

router.post('/encolar-dummy', async (_req, _res) => {
    console.log(_req.body);
    const { id_nuevo } = _req.body;
    const datosDummy = await obtenerDatosDummy();
    datosDummy.id_nuevo = id_nuevo;
    encolarJSON(process.env.QUEUE_NAME, JSON.stringify(datosDummy));
    return _res.json(datosDummy);
});

router.get('/desencolar-dummy', async (_req, _res) => {
    desencolarJSON(process.env.QUEUE_NAME)
    return _res.sendStatus(200);

});

module.exports = router;