const UserSeller = require('../../models/UserSeller');
const Product = require('../../models/Product');

module.exports = async (req, res) => {
    let id = req.session.userId;
    let id2 = req.params.id;
    let UserSellerData = await UserSeller.findById(id);
    let UserSellerData2 = await UserSeller.findById(id2);
    if (UserSellerData || UserSellerData2) {
        if (UserSellerData2) {
            UserSellerData = UserSellerData2;
        }
        req.session.userId = UserSellerData._id;
        console.log('Before render');
        res.render('addProduct', {
            UserSellerData,
        })
    } else {
        res.redirect('/seller/login');
    }
}