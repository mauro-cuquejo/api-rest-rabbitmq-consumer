const app = require('./app');
const dotenv = require('dotenv')
const suscriber = require('../src/libs/suscriber');
const desencolarJSON = suscriber.desencolarJSON;
dotenv.config();

app.set('port', process.env.PORT || 4006);

const port = process.env.PORT;
console.log(port);

desencolarJSON(process.env.QUEUE_NAME);

async function main() {
    await app.listen(app.get('port'));
    console.log('Server is running');
}

main();