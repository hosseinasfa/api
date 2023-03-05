const transform = require('modules/transforms/transform');

module.exports = class courseTranform extends transform {

    transform(item) {
        return {
            'title' : item.title,
            'body' : item.body,
            'price' : item.price,
        }
    }

    

}