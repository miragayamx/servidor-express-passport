const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const productRouter = require('./routes/productRouter');
const vistaRouter = require('./routes/vistaRouter');
const Mensaje = require('./models/mensaje');
const { createUploadsFolder, createDBLiteFolder, readFile, saveFile, appendFile } = require('./utils/fileManager');
require('./db/mongoose');

const PORT = process.env.PORT || 8080;

app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'index',
		layoutsDir: path.join(__dirname, '/views/layouts'),
		partialsDir: path.join(__dirname, '/views/partials')
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/productos', vistaRouter);
app.use('/api', productRouter);

//SOCKET
io.on('connection', (socket) => {
	//TABLA EN TIEMPO REAL
	socket.on('getUpdate', async () => {
		try {
			const lista = await productos.getProducts();
			io.emit('update', { existe: true, lista: lista });
		} catch (err) {
			io.emit('update', { existe: false, lista: lista });
		}
	});
	//CHAT
	(async () => {})();
	socket.on('getChatMessages', async () => {
		try {
      const messages = await Mensaje.find();
			if (!messages.length) throw new Error('ENOENT');
			io.emit('messages', messages);
		} catch (err) {
			if (err.message === 'ENOENT') return io.emit('chatInfo', { info: 'No se encontraron mensajes' });
			io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
		}
	});
	socket.on('setNewChatMessages', async (message) => {
		try {
			const data = await Mensaje.find();
			let messages = [];
			if (!!data.length) messages = data;
			const messageWithDate = {
				...message,
				date: new Date().toLocaleString('es-AR')
			};
      const newMessage = new Mensaje(messageWithDate);
			await newMessage.save();
			messages.push(messageWithDate);
			io.emit('messages', messages);
		} catch (err) {
			io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
		}
	});
});

const server = http.listen(PORT, async () => {
	try {
		console.log(`El servidor esta corriendo en el puerto: ${server.address().port}`);
		await createUploadsFolder();
	} catch (err) {
		console.log(err);
	}
});

server.on('error', (err) => console.log(`Error de servidor: ${err}`));
