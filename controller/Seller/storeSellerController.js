const UserBuyer = require('../../models/UserBuyer');
const UserSeller = require('../../models/UserSeller');


// assign location information
// create new user
module.exports = async(req, res) => {

    const email = req.body.email;
    const storename = req.body.storename;
    const tel = req.body.tel;

    try {
        // check with UserSeller
        const emailExist = await UserSeller.findOne({email});
        const telExist = await UserSeller.findOne({tel});
        const storenameExist = await UserSeller.findOne({storename});

        // check email and tel with UserBuyer
        const emailBuyer = await UserBuyer.findOne({email});
        const telBuyer = await UserBuyer.findOne({tel});

        if (emailExist) {
            req.session.message = "Email is already registered";
            return res.redirect('/seller/signup');
        }   
        if (telExist) {
            req.session.message = "Phone number is already existed";
            return res.redirect('/seller/signup');
        }
        if (storenameExist) {
            req.session.message = "Store Name is already existed";
            return res.redirect('/seller/signup');
        }
        if (emailBuyer) {
            req.session.message = "Email is already registered";
            return res.redirect('/seller/signup');
        }
        if (telBuyer){
            req.session.message = "Phone number is already existed";
            return res.redirect('/seller/signup');
        }


        await UserSeller.create(req.body); // create a new user

        console.log('register successful');
        return res.redirect('/seller/login');

    } catch (error) {
        if (error.errors) {
            console.log(error);
            // access key from object errors
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            req.session.message("error");
            return res.redirect('/seller/signup'); 
        }
    }
}

// const UserBuyer = require('../../models/UserBuyer');
// const UserSeller = require('../../models/UserSeller');

// async function storeSellerController(req, res) {
//     const email = req.body.email;
//     const storename = req.body.storename;
//     const tel = req.body.tel;
    
//     try {
//         // Check with UserSeller
//         const emailExist = await UserSeller.findOne({ email });
//         const telExist = await UserSeller.findOne({ tel });
//         const storenameExist = await UserSeller.findOne({ storename });

//         // Check email and tel with UserBuyer
//         const emailBuyer = await UserBuyer.findOne({ email });
//         const telBuyer = await UserBuyer.findOne({ tel });

//         if (emailExist || telExist || storenameExist || emailBuyer || telBuyer) {
//             req.session.message = "Registration information already exists.";
//             return res.redirect('/seller/signup');
//         }

//         await UserSeller.create(req.body); // Create a new user
//         console.log('Registration successful');
//         return res.redirect('/seller/login');
//     } catch (error) {
//         if (error.errors) {
//             console.log(error);
//             // Access keys from object errors
//             const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
//             req.flash('validationErrors', validationErrors);
//             req.flash('data', req.body);
//             return res.redirect('/seller/signup');
//         }
//     }
// }

// module.exports = storeSellerController;