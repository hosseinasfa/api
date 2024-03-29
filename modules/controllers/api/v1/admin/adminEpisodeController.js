const controller = require('modules/controllers/api/controller');
const { check } = require('express-validator');

module.exports = new class adminEpisodeController extends controller {
    index(req , res) {
        this.model.Episode.find({} , (err , episodes) => {
            if(err) throw err;

            if(episodes) {
                return res.json({
                    data : episodes,
                    success : true
                });
            }
        })
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req , res))
                return;

        this.model.Episode.findById(req.params.id , (err , episode) => {
            if(episode) {
                return res.json({
                    data : episode,
                    success : true
                })
            }

            res.json({
                data : 'not found',
                success : false
            })
        })
    }

    store(req , res) {
        //validation
        // req.checkBody('title' , 'عنوان نمیتواند خالی بماند').notEmpty();
        // req.checkBody('body' , 'متن نمیتواند خالی بماند').notEmpty();
        // req.checkBody('course_id' , 'آیدی دوره نمیتواند خالی بماند').notEmpty();
        // req.checkBody('videoUrl' , 'آدرس ویدیو نمیتواند خالی بماند').notEmpty();
        // req.checkBody('number' , 'شماره ویدیو نمیتواند خالی بماند').notEmpty();
        [
        check('title')
            .not()
            .isEmpty()
            .withMessage('عنوان نمیتواند خالی بماند'),
        ]
        
        // this.escapeAndTrim(req , 'title body course_id videoUrl number');

            // if(this.showValidationErrors(req , res))
            //     return;

        let course = this.model.Course.findById(req.body.course_id , (err , course) => {
            
            let episode = new this.model.Episode({
                course : course._id,
                title : req.body.title,
                body : req.body.body,
                videoUrl : req.body.videoUrl ,
                number : req.body.number
            });
    
            episode.save(err => {
                if(err) throw err;
    
                course.episodes.push(episode._id);
                course.save();
            
                res.json({
                    data : 'ویدیو با موفقیت ایجاد شد',
                    success : true
                })
            })    
        })

    }


    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req , res))
                return;

        this.model.Episode.findByIdAndUpdate(req.params.id , { 
            title : 'episode 11'
        }, (err , episode) => {
            if(err) throw err;

            if(episode) {
                return res.json({
                    data : 'ویدیو با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req , res))
                return;

        this.model.Episode.findById(req.params.id).populate('course').exec((err , episode) => {
            if(err) throw err;
            
            if(episode) {
                let course = episode.course;
                let position = course.episodes.indexOf(episode._id);
                course.episodes.splice(position , 1);
                course.save(err => {
                    if(err) throw err;

                    episode.remove();
                    res.json({
                        data : 'ویدیو شما با موفقیت حذف شد',
                        success : true
                    });
                });
                return;
            }

            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : true
            });
        })
    }
}