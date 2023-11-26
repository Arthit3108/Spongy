const UserSeller = require('../../models/UserSeller');
const Food = require('../../models/Food');
const multer = require('multer');

module.exports = async (req, res) => {
    try {
        console.log('storeFood');
        let id = req.params.id;
        // console.log(id);
        let UserSellerData = await UserSeller.findById(id);
        console.log(UserSellerData);
        req.body.storename = UserSellerData.storename;
        req.body.imageProduct = req.file.filename;
        await Food.create(req.body);
    
        console.log('add food successful');
        return res.redirect(`/seller/${id}`);
    } catch(error) {
        if (error.errors) {
            console.log(error);
            return res.redirect(`/seller/${id}`); 
        }
    }
    

}