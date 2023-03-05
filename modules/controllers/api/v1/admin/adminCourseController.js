const controller = require('modules/controllers/api/controller')


module.exports = new class adminCourseController extends controller {
    index(req , res) {
        this.model.Course.find({} , (err , courses) => {
            if(err) throw err;
    
            if(courses) {
                return res.json({
                    data : courses,
                    success : true
                });
            }
        })
    }

    single(req , res) {
        res.json('single course')
    }


    store(req , res) {
            //Validation 
    
        let newCourse = new Course({
            title : req.body.title,
            body : req.body.body,
            price : req.body.price,
            image : req.body.image
        }).save(err => {
            if(err) throw err;
            res.json('create course')
        })
    }

    update(req , res) {
        Course.findByIdAndUpdate(req.params.id , { title : 'course three'}, (err , course) => {
            res.json('update success');
        });
    }

    destroy(req , res) {
        Course.findByIdAndRemove(req.params.id , (err , course) => {
            if(err) throw err;
            res.json('delete success');
        })
    }
}