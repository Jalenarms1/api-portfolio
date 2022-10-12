// Place script code for routes here
const router = require("express").Router();
const routes = require("./api");
const {Project} = require("../models");
const {checkLogin } = require("../utils/helpers");

router.use("/api", routes);

router.get("/", async (req, res) => {
    try{
        let allProjects = await Project.findAll();

        let projects = allProjects.map(item => {
            return item.get({plain: true})
        })


        res.render("home", {
            isLoggedIn: req.session.isLoggedIn,
            projects
    
        })

    }catch(err){
        console.log(err);
        res.json(err)
    }

})

router.get("/admin/enter", (req, res) => {
    res.render("admin-login", {
        isLoggedIn: req.session.isLoggedIn
    })
})

router.get("/admin/enter-proj", checkLogin, async (req, res) => {
    res.render("admin-post", {
        isLoggedIn: req.session.isLoggedIn
    })
})

router.get("/admin/init-page", (req, res) => {
    res.render("admin-init", {
        isLoggedIn: req.session.isLoggedIn
    })
})

module.exports = router;