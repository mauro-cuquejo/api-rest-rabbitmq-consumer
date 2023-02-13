const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    async obtenerDatosDummy() {
        let urlDatosDummy = (process.env.NODE_ENV === 'production') ? process.env.URL_DATOS_DUMMY : 'localhost';
        let options = {
            host: urlDatosDummy,
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
                reject(new Error('Error procesando datos Dummy' + error + "\n process.env.NODE_ENV: " + process.env.NODE_ENV + ""));
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
