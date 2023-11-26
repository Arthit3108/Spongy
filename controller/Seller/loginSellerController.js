const UserSeller = require('../../models/UserSeller');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const {email, password} = req.body;

    UserSeller.findOne({email: email}).then((user) => {
        // console.log(user);
        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect(`/seller/${user._id}`);
                } else {
                    console.log("Wrong Email or Password");
                    req.session.message = "Wrong Email or Password";
                    res.redirect('/seller/login');
                }
            })
        } else {
            console.log("Wrong Email or Password");
            req.session.message = "Wrong Email or Password";
            res.redirect('/seller/login');
        }
    })
}