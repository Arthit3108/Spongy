const UserSeller = require('../../models/UserSeller');
const Product = require('../../models/Product');

module.exports = async (req, res) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('list URL:', url);
    try {
        let id = req.session.userId;
        // req.session.userId = id;
        let UserSellerData = await UserSeller.findById(id);
        const storename = UserSellerData.storename;
        const product = await Product.find({ storename: storename});
        let warning = "";
        console.log('before render listproduct')
        console.log(req.session.userId);
        if (product) {
            res.render('listProduct', {
                UserSellerData,
                product,
                warning: warning
            })
        }
        else {
            warning = "Your Store does not have a Product"
            res.render('listProduct', {
                UserSellerData,
                warning: warning,
            })
        }
    } catch (error) {
        console.log(error);
        return res.redirect(`/seller/${id}`); 
    }
    
}