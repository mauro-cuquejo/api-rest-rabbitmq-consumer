const app = require('./app');
const dotenv = require('dotenv')
const suscriber = require('../src/libs/suscriber');
dotenv.config();

app.set('port', process.env.PORT || 4001);

const port = process.env.PORT;
console.log(port);

suscriber.desencolarJSON(process.env.QUEUE_NAME);

async function main() {
    await app.listen(app.get('port'));
    console.log('Server is running');
}

main();