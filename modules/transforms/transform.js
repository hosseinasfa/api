module.exports = class transform {

    transformCollection(items) {
        return items.map(this.transform)
    }

}