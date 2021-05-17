const login = async (req, res) => {
	try {
		const currentUser = req.body.username;
		if (!currentUser) throw new Error('El inicio de sesión falló');
		req.session.user = currentUser;
		res.status(200).send('Inicio de sesión existoso!');
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const logout = async (req, res) => {
	try {
		req.destroy((err) => {
			if (!!err) throw new Error('No se pudo cerrar la sesión');
		});
		res.redirect('/logout');
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

module.exports = {
	login,
	logout
};
