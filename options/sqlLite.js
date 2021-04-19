const options = {
	client: 'sqlite3',
	connection: {
		filename: './DBLite/mibase.sqlite'
	},
	useNullAsDefault: true
};

module.exports = { options };
