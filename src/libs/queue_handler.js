const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv');
dotenv.config();

//sender
exports.encolarJSON = async function (queue, json) {
    //crear conexión (no debería ser async?)
    await amqp.connect(process.env.RABBITMQ_SERVER, async (error_conexion, conexion) => {
        if (error_conexion) throw error_conexion;

        await conexion.createChannel(async (error_canal, canal) => {
            if (error_canal) throw channelError;

            //Verificar si existe la cola
            canal.assertQueue(queue);
            // enviar mensaje a la cola
            canal.sendToQueue(queue, Buffer.from(json), {},
                function (err, ok) {
                    if (ok) {
                        console.log(`mensaje enviado a cola ${queue}: ${json}`);
                    }
                    if (err !== null)
                        console.warn('Mensaje falló al encolar!' + err);
                });
        });
    });
}

//receiver
exports.desencolarJSON = async function (queue) {
    let mensajes_encolados = [];
    return new Promise((resolve, reject) => {
        amqp.connect(process.env.RABBITMQ_SERVER, (error_conexion, conexion) => {
            if (error_conexion) return reject(error_conexion);
            conexion.createChannel((error_canal, canal) => {
                if (error_canal) return reject(error_canal);
                canal.assertQueue(queue);
                canal.consume(queue, (msj) => {
                    const contenido = JSON.parse(msj.content.toString());
                    mensajes_encolados.push(contenido);
                    if (!canal.consuming) {
                        resolve(mensajes_encolados);
                    }
                    setTimeout(() => {
                        canal.ack(msj);
                        conexion.close();
                    }, 500);
                });
            });
        });
    });
}
