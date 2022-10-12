// Place script code for helper functions here
const {Project} = require("../models");

module.exports = {
    checkLogin: async (req, res, next) => {
        if(!req.session.isLoggedIn){
            let allProjects = await Project.findAll();

            let projects = allProjects.map(item => {
                return item.get({plain: true})
            })

            res.render("home", {
                isLoggedIn: req.session.isLoggedIn,
                projects
            })
        }else{
            console.log("hello");
            next();
        }
        
    }
}