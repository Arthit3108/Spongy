const UserSeller = require('../models/UserSeller');

module.exports = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('URL:', url);
    let id = req.session.userId;
    if (!id) {
        let id2 = req.params.id;
        id = id2;
    }
    
    console.log("IsSeller");
    console.log(id);
    try {
        const user = await UserSeller.findById(id);
        // const user2 = await UserSeller.findById(id2);
        req.session.userId = id;
        if (!user) {
            return res.redirect(`/buyer/${id}`);
        } else {
            next();
        }
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
}