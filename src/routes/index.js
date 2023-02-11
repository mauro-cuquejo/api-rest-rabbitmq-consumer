const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
    return res.json({ id_transaccion_canal: 'asdasd-asdasd-asdasd-asdasd', importe: 1000.23, id_cuenta: '00011122233344455566677788899922' });
});

module.exports = router;