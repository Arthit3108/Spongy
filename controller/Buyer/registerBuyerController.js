// async function registerBuyerController(req, res) {
//     try {
//         let email = ""
//         let password = ""
//         let tel = ""
//         let fullname = ""
//         let data = req.flash('data')[0]; // last information that is added in flash
    
//         if (typeof data != "undefined") {
//             fullname = data.fullname
//             email = data.email;
//             password = data.password;
//             tel = data.tel;
//         }
//         res.render('registerBuyer', {
//             errors: req.flash('validationErrors'), // send to register page
//             fullname: fullname, 
//             email: email,
//             password: password,
//             tel: tel
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// }

// module.exports = registerBuyerController;
module.exports = (req, res) => {
    let email = ""
    let password = ""
    let tel = ""
    let fullname = ""
    let warning = ""
    let data = req.flash('data')[0]; // last information that is added in flash

    if (typeof data != "undefined") {
        fullname = data.fullname
        email = data.email;
        password = data.password;
        tel = data.tel;
    }
    if (req.session.message) {
        warning = req.session.message;
        console.log(warning);
    }
    res.render('registerBuyer', {
        errors: req.flash('validationErrors'), // send to register page
        warning: warning,
        fullname: fullname, 
        email: email,
        password: password,
        tel: tel
    });
}