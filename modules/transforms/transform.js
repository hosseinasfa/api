const autoBind = require('auto-bind');

module.exports = class transform {

    constructor() {
        autoBind(this);
    }

    transformCollection(items) {
        return items.map(this.transform)
    }

}