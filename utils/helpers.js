// Place script code for helper functions here
module.exports = {
    checkLogin: (req, res, next) => {
        if(!req.session.isLoggedIn){
            res.render("home")
        }
        next();
    }
}