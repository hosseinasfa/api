const autoBind = require('auto-bind');
const Course = require('modules/models/course');
const Episode = require('modules/models/episode');
const User = require('modules/models/user');
const { validationResult } = require('express-validator');

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.model = { Course , Episode , User }
    }

    validationData(req , res) {
        let error = validationResult(req);
        if(! error.isEmpty()) {
                const errors = error.array();
                const messages = [];
    
                errors.forEach(err => messages.push(err.msg));
                
                if(errors) {
                    res.status(422).json({
                        message : errors.map(error =>{
                            return {
                                'field' : error.param,
                                'message' : error.msg
                            }
                        }),
                        success : false
                    });
                    return true;
                }

                // req.flash('errors' , messages)
    
                return true;
            }
    
      }


      

    // showValidationErrors (req , res) {
    //     let errors = req.validationErrors();
    //         if(errors) {
    //             res.status(422).json({
    //                 message : errors.map(error =>{
    //                     return {
    //                         'field' : error.param,
    //                         'message' : error.msg
    //                     }
    //                 }),
    //                 success : false
    //             });
    //             return true;
    //         }
    //         return false;
    // }

    escapeAndTrim(req , items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        })
    }
}