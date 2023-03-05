const autoBind = require('auto-bind');
const Course = require('modules/models/course');
const Episode = require('modules/models/episode');

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.model = { Course , Episode }
    }
}