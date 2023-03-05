const controller = require('modules/controllers/api/controller');
const courseTransform = require('modules/transforms/v1/courseTransform');

module.exports = new class courseController extends controller {
    index(req , res) {
        this.model.Course.find({} , (err , courses) => {
            if(err) throw err;
    
            if(courses) {
                return res.json({
                    data : new courseTransform().transformCollection(courses),
                    success : true
                });
            }

            res.json({
                message : 'Courses empty',
                success : false
            })
        });

        /* this.model.Course.findOne({_id : '63fd7507af9be85a5fcec14e'} , (err , course) => {
            if(err) throw err;

            if(course) {
                res.json({
                    data: new courseTransform().transform(course),
                    success : true
                })
            }
        }) */
    }
}