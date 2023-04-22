const transform = require('modules/transforms/transform');


module.exports = class courseTranform extends transform {

    constructor() {
        super();
        const episodeTransform = require('modules/transforms/v1/episodeTransform');
    }

    transform(item) {
        return {
            'title' : item.title,
            'body' : item.body,
            'price' : item.price,
            ...this.showEpisodes(item)
        }
    }


    showEpisodes(item) {
        if(this.withEpisodesStatus) {
            return {
                episodes : new episodeTransform().transformCollection(item.episodes)
            }
        }
        return {}
    }

    withEpisodes() {
        this.withEpisodesStatus = true;
        return this;
    }
    

}