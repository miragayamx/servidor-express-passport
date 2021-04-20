const options = {
	client: 'sqlite3',
	connection: {
		filename: './DBLite/chat-messages.sqlite'
	},
	useNullAsDefault: true
};

module.exports = { options };
