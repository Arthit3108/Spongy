const UserBuyer = require('../../models/UserBuyer');
const UserSeller = require('../../models/UserSeller');

async function storeBuyerController(req, res) {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const tel = req.body.tel;


    try {
        const emailExist = await UserBuyer.findOne({ email });
        const telExist = await UserBuyer.findOne({ tel });
        const fullnameExist = await UserBuyer.findOne({ fullname });

        // Check email and tel with UserSeller
        const emailSeller = await UserSeller.findOne({ email });
        const telSeller = await UserSeller.findOne({ tel });

        if (emailExist || telExist || fullnameExist || emailSeller || telSeller) {
            req.session.message = "Registration information already exists";
            return res.redirect('/buyer/signup');
        }


        await UserBuyer.create(req.body);
        console.log('Registration successful');

        req.session.message = "Registered Successfully";
        return res.redirect('/buyer/login');
    } catch (error) {
        if (error.errors) {
            console.log(error);
            // Access keys from object errors
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/buyer/signup');
        }
    }
}

module.exports = storeBuyerController;