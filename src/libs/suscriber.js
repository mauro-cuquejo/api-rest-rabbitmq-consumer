const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

var canal, conexion;

async function conectar(queue) {
    let url = (process.env.NODE_ENV === 'production') ?
        process.env.RABBITMQ_SERVER_CONTENEDOR :
        process.env.RABBITMQ_SERVER_LOCAL;

    console.log("url rabbit: " + url);
    conexion = await amqp.connect(url, (error) => { if (error) throw error; });
    canal = await conexion.createChannel();
    await canal.assertQueue(queue);
}

//receiver
exports.desencolarJSON = async function (queue) {
    conectar(queue).then(() => {
        canal.consume(queue, (data) => {
            console.log(`Consumiendo cola ${queue}`);
            const { id_transaccion_canal, importe, id_cuenta, id_nuevo } = JSON.parse(data.content.toString());
            console.log(`id_transaccion_canal: ${id_transaccion_canal}`);
            console.log(`importe: ${importe}`);
            console.log(`id_cuenta: ${id_cuenta}`);
            console.log(`id_nuevo: ${id_nuevo}`);
            canal.ack(data);
        });
    }, (error) => { console.log(error) });
}
