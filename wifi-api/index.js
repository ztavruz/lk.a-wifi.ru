const app = require('./app');
const keys = require('./config/keys-api');


app.listen(keys.myPort,() => console.log(`Сервер запущен, на порту: ${keys.myPort}`));