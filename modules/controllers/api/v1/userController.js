const controller = require('modules/controllers/api/controller');
const userTransform = require('modules/transforms/v1/userTransform');

module.exports = new class userController extends controller {
    index(req , res) {
        return res.json({
            data : new userTransform().transform(req.user)
        })
    }
}