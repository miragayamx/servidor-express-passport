const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');
const User = require('../models/user');

const isCredencialesOk = (user, password) => bCrypt.compareSync(password, user.password);
const createHashPaswword = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

passport.use(
	'login',
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		async function(req, username, password, done) {
			try {
				const user = await User.findOne({ username: username });
				if (!user) return done(null, false);
				if (!isCredencialesOk(user, password)) return done(null, false);
				return done(null, user);
			} catch (err) {
				throw err;
			}
		}
	)
);

passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done) {
			findOrCreateUser = async function() {
				try {
					const user = await User.findOne({ username: username });
					if (user) return done(null, false);
                    const newUser = new User({
						username: username,
						password: createHashPaswword(password)
					});
                    await newUser.save()
					return done(null, user);
				} catch (err) {
					throw err;
				}
			};
			process.nextTick(findOrCreateUser);
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		throw err;
	}
});
