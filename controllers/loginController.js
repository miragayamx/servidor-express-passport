const login = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('login', { user: req.session.user, lista: lista, existe: true });
	} catch (err) {
		res.render('login', { user: req.session.user, lista: [], existe: false });
	}
};

const setCurrentUser = async (req, res) => {
	try {
		const currentUser = req.body.user;
		if (!currentUser) throw new Error('El inicio de sesión falló');
		req.session.user = currentUser;
		res.redirect('/login');
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const removeCurrentUser = async (req, res) => {
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
	setCurrentUser,
	removeCurrentUser
}