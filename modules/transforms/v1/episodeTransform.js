const transform = require('modules/transforms/transform');
const courseTransform = require('modules/transforms/v1/courseTransform');

module.exports = class episodeTranform extends transform {

    transform(item) {
        return {
            'title' : item.title,
            'body' : item.body,
            'course' : new courseTransform().transform(item.course)
        }
    }
}