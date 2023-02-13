const dotenv = require('dotenv');
const { Router } = require('express');
const { obtenerDatosDummy } = require('../libs/dummy_request_handler');
const queue_handler = require('../libs/queue_handler');
const encolarJSON = queue_handler.encolarJSON;
const desencolarJSON = queue_handler.desencolarJSON;
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
router.get('/obtenerDatosDummy', async (_req, _res) => {
    try {
        const datosDummy = await obtenerDatosDummy();
        return _res.json({ datosDummy });
    } catch (error) {
        _res.status(500).send(error.message);
    }
});

router.get('/encolarDatosDummy', async (_req, _res) => {
    const datosDummy = await obtenerDatosDummy();
    encolarJSON(process.env.QUEUE_NAME, JSON.stringify(datosDummy))
        .then(_res.status(200).send("Operación realizada de forma exitosa. Se enviaron los datos: " + JSON.stringify(datosDummy)))
        .catch(error => _res.status(500).send(error));
});

router.get('/desencolarDatosDummy', async (_req, _res) => {
    desencolarJSON(process.env.QUEUE_NAME)
        .then(result => _res.json(result))
        .catch(error => _res.status(500).send(error));
});

module.exports = router;