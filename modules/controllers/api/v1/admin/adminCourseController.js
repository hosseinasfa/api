const controller = require('modules/controllers/api/controller');


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
            req.checkBody('title' , 'عنوان نمیتواند خالی بماند').notEmpty();
            req.checkBody('body' , 'متن نمیتواند خالی بماند').notEmpty();
            req.checkBody('price' , 'قیمت نمیتواند خالی بماند').notEmpty();
            req.checkBody('image' , 'عنوان نمیتواند خالی بماند').notEmpty();

            this.escapeAndTrim(req , 'title price image');

            if(this.showValidationErrors(req , res))
                return;
            
       
    
        let newCourse = new this.model.Course({
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
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req , res))
                return;

        this.model.Course.findByIdAndUpdate(req.params.id , { title : 'course three'}, (err , course) => {
            res.json('update success');
        });
    }

    destroy(req , res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req , res))
                return;
        this.model.Course.findByIdAndRemove(req.params.id , (err , course) => {
            if(err) throw err;
            res.json('delete success');
        })
    }
}