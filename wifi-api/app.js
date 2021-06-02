const express = require("expresssS");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const companyRoutes = require('./routes/user/companyRoutes');
const transportsRoutes = require('./routes/user/transportsRoutes');
const buildsRoutes = require('./routes/user/buildsRoutes');
const usersRoutes = require('./routes/user/usersRoutes');
const notificationsRoutes = require('./routes/user/notificationsRoutes');
const camerasRoutes = require('./routes/user/camerasRoutes');
const videosRoutes = require('./routes/user/videosRoutes');

const godCompanyRoutes = require('./routes/god/godCompanyRoutes');
const godUsersRoutes = require('./routes/god/godUsersRoutes');
const godTransportsRoutes = require('./routes/god/godTransportsRoutes');
const godBuildsRoutes = require('./routes/god/godBuildsRoutes');
const godCamerasRoutes = require('./routes/god/godCamerasRoutes');
const godVideosRoutes = require('./routes/god/godVideosRoutes');

const godNotificationsRoutes = require('./routes/god/godNotificationsRoutes');
const godAuthoInjectRoutes = require('./routes/god/godAuthoInjectRoutes');

// Подключение к БД
const keys = require('./config/keys-api');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(keys.MongoDB_URI, {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log(`MongoDB connected!`);
});

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/company',          companyRoutes);
app.use('/api/transports',       transportsRoutes);
app.use('/api/builds',           buildsRoutes);
app.use('/api/users',            usersRoutes);
app.use('/api/notifications',    notificationsRoutes);
app.use('/api/cameras',          camerasRoutes);
app.use('/api/videos',           videosRoutes);

app.use('/api/godcompany',       godCompanyRoutes);
app.use('/api/godusers',         godUsersRoutes);
app.use('/api/godtransports',    godTransportsRoutes);
app.use('/api/godbuilds',        godBuildsRoutes);
app.use('/api/godcameras',       godCamerasRoutes);
app.use('/api/godvideos',        godVideosRoutes);

app.use('/api/godnotifications', godNotificationsRoutes);
app.use('/api/godauthoinject',   godAuthoInjectRoutes);

module.exports = app;