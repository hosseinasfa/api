module.exports = new class homecontroller {
    index(req , res) {
        res.json('Welcome to Api');
    }

    version(req , res) {
        res.json('Version 1')
    }
}