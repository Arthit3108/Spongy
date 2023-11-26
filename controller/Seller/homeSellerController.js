const UserSeller = require('../../models/UserSeller');
const Product = require('../../models/Product');
const Food = require('../../models/Food');

module.exports = async(req, res) => {
    let id = req.session.userId;
    let id2 = req.params.id;
    let UserSellerData = await UserSeller.findById(id);
    let UserSellerData2 = await UserSeller.findById(id2);
    let warningLocation = "";
    if (UserSellerData || UserSellerData2) {
        if (req.session.message){
            warningLocation = req.session.message;
            console.log("homeSellerController");
            delete req.session.message;
        }
        if (UserSellerData2) {
            UserSellerData = UserSellerData2;
        }
        req.session.userId = UserSellerData._id;
        let storename = UserSellerData.storename;
        const product = await Product.find({storename: storename});
        const food = await Food.find({storename: storename});
        // console.log(product); 
        // console.log(warningLocation);
        res.render('homeSeller2', {
            UserSellerData,
            warningLocation,
            product,
            food,
        })
    } else {
        res.redirect('/seller/login');
    }
}