async function registerSellerController(req, res) {
    try {
        let email = ""
        let password = ""
        let tel = ""
        let storename = ""
        let warning = ""
        let data = req.flash('data')[0]; // last information that is added in flash
    
        if (typeof data != "undefined") {
            storename = data.storename
            email = data.email;
            password = data.password;
            tel = data.tel;

        }
        if (req.session.message) {
            warning = req.session.message;
            console.log(warning);
            delete req.session.message;
        }

        res.render('registerSeller', {
            errors: req.flash('validationErrors'), // send to register page
            warning: warning,
            storename: storename, 
            email: email,
            password: password,
            tel: tel,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = registerSellerController;