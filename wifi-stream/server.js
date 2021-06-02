let keys = require( './config/keys-stream');

var WS = require('ws'),
	Net = require('net'),
	Events = require('events'),
	makeStream = require('./FFStream.js'),
	wsServer = new WS.Server({port: keys.myPort});


const FFMPEG_OPTIONS = [
	'-r', '25',
	'-f', 'mpegts',
	'-codec:v', 'mpeg1video',
	'-codec:a', 'mp2',
	'-ar', '44100',
	'-ac', '1',
	'-b:a', '64k'
];


wsServer.on("connection", (socket, request) => {
	var cameraId = request.url.slice(1);
	cameraId = cameraId.split("/")[1];
	console.log(cameraId);
	makeStream(
		`rtsp://${keys.serverStream}/${cameraId}`,
		FFMPEG_OPTIONS,
		socket
	);

});
