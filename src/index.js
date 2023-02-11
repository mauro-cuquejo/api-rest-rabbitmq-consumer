const app = require('./app');
const dotenv = require('dotenv')
dotenv.config();

app.set('port', process.env.PORT || 4000);

const port = process.env.PORT;
console.log(port);

async function main() {
    await app.listen(app.get('port'));
    console.log('Server is running');
}

main();