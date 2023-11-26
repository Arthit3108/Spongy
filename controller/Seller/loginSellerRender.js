module.exports = (req, res) => {
    const warning = req.session.message;
    delete req.session.message;
    res.render('loginSeller', {
        warning: warning
    });
}