const app = require('./app');
const keys = require('./config/keys-mail');

app.listen(keys.myPort,() => console.log(`Сервер запущен, на порту: ${keys.myPort}`));