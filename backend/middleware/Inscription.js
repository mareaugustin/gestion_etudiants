
function Inscription(req, res, next) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (!email || !emailRegex.test(email)) {
        errors.push('Email invalid');
    }

    if (!password || password.length < 8) {
        errors.push('Minimun 8 caractères');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { Inscription };