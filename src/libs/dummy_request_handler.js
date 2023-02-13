const http = require('http');
const https = require('https')

module.exports = {
    async obtenerDatosDummy() {
        let options = {
            host: 'localhost',//'172.17.0.1',
            port: 5000,
            path: '/'
        };
        return new Promise((resolve, reject) => {
            http.get(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    jsonData = procesarDatosJSON(data);
                    resolve(jsonData);
                });
            }).on('error', (error) => {
                reject(new Error('Error procesando datos Dummy'));
            });
        });
    }
}

function procesarDatosJSON(data) {
    jsonData = JSON.parse(data);
    jsonData.nuevo_campo = "NUEVO CAMPO!!!";
    jsonData.importe = jsonData.importe * 2;
    return jsonData;
}
