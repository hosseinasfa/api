const controller = require('modules/controllers/api/controller');
const episodeTransform = require('modules/transforms/v1/episodeTransform');

module.exports = new class episodeController extends controller {
    single(req , res) {
        this.model.Episode.findById(req.params.id).populate('course').exec((err , episode) => {
            if(err) throw err;
    
            if(episode) {
                return res.json({
                    data : new episodeTransform().transform(episode),
                    success : true
                });
            }

            res.json({
                message : 'Episode empty',
                success : false
            })
        });
    }
}