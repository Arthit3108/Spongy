const UserSeller = require('../../models/UserSeller');
module.exports = async(req, res) => {
    let id = req.session.userId;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    // ส่งไปแล้วไม่ขึ้นในหน้า render eeeee
    if (latitude === undefined) {
        console.log("Please provide a latitude");
        req.session.message = {
            type: 'danger',
            message: "Please allow location permission",
        };
        req.session.userId = id;
        return res.redirect(`/seller/${id}`);
    }
    try {
        await UserSeller.findByIdAndUpdate(id, {
            $set: { location: {
                type: 'Point',
                coordinates: [longitude, latitude], 
            }}
        })
        console.log('Updated');
        res.redirect(`/seller/${id}`);
    } catch (err) {
        if (err) {
            res.json({message: err.message, type: 'danger'});
            res.redirect('/seller/login');
        } else {
            req.session.message = 'User location updated successfully';
            res.redirect(`/seller/${id}`);
        }
    }
    // if (latitude && longitude) {
    //     res.redirect('/seller/signup', )
    // }

}