const User = require('../../models/UserBuyer');

module.exports = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}).then((user) => {
        console.log(user);

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/home'); // home of each of ida
                } else {
                    req.session.message = "Wrong Email or Password";
                    res.redirect('/buyer/login');
                }
            })
        } else {
            eq.session.message = "Wrong Email or Password";
            res.redirect('/buyer/login');
        }
    })
}