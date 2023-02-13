const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

var canal, conexion;

async function conectar(queue) {
    let urlRabbit = (process.env.NODE_ENV === 'production') ?
        process.env.RABBITMQ_SERVER_CONTENEDOR :
        process.env.RABBITMQ_SERVER_LOCAL;

    conexion = await amqp.connect(urlRabbit);
    canal = await conexion.createChannel();
    await canal.assertQueue(queue);
}

//sender
exports.encolarJSON = async function (queue, stringJson) {
    conectar(queue).then(() => {
        canal.sendToQueue(queue, Buffer.from(stringJson));
        setTimeout(function () { conexion.close(); }, 500);
    });
    if (this.canal) this.canal.close();
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
        }, { noAck: true });
    });
    if (this.canal) this.canal.close();
}
