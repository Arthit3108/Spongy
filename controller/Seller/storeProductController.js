const UserSeller = require('../../models/UserSeller');
const Product = require('../../models/Product');
const multer = require('multer');

module.exports = async (req, res) => {
    try {
        let id = req.params.id;
        let UserSellerData = await UserSeller.findById(id);
        req.body.storename = UserSellerData.storename;
        req.body.imageProduct = req.file.filename;
        // console.log(req.file.filename);
        await Product.create(req.body);
    
        console.log('add product successful');
        return res.redirect(`/seller/${id}`);
    } catch(error) {
        if (error.errors) {
            console.log(error);
            return res.redirect(`/seller/${id}`); 
        }
    }
    

}