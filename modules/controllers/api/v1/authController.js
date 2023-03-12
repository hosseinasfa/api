const controller = require('modules/controllers/api/controller');
const userTransform = require('modules/transforms/v1/userTransform');
const bcrypt = require('bcrypt');


module.exports = new class authController extends controller {
    async register(req , res) {

        if(this.validationData(req, res)) {
            return;
        }
            

            const newUser = new this.model.User({
                name : req.body.name,
                email : req.body.email
            });

            await newUser.$set({ password : newUser.hashPassword(req.body.password) });

            await newUser.save(err => {
                if(err) {
                    
                if(err.code == 11000) {
                    return res.json({
                        data : 'ایمیل نمی تواند تکراری باشد',
                        success : false
                    })
                } else {
                    throw err;
                }
                }
                
                res.json({
                    data : 'کاربر با موفقیت عضو وب سایت شد',
                    success : true
                });
            })

    }

    login(req , res) {

        if(this.validationData(req, res)) 
            return;

            this.model.User.findOne({ email : req.body.email } , (err , user) => {
                if(err) throw err;
    
                if(user == null) 
                    return res.status(422).json({
                        data : 'اطلاعات وارد شده صحیح نیست',
                        success : false
                    });
    
                bcrypt.compare(req.body.password , user.password , (err , status) => {
    
                    if(! status) 
                        return res.status(422).json({
                            success : false,
                            data : 'پسورد وارد شده صحیح نمی باشد'
                        })
                    
                    return res.json({
                        data : new userTransform().transform(user , true),
                        success : true
                    });  
                })
            })

    }
}