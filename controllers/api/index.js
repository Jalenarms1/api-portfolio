// Place script code for routes here
const router = require("express").Router();
const {User, Project} = require("../../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dvlhy87zl', 
    api_key: '132219615124213', 
    api_secret: 'jaTgCwIuhsA_6rGrxRqG7xVh71U' 
  });

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};



router.post("/admin/init", async (req, res) => {
    try{
        let newAdmin = await User.create(req.body);

        console.log(newAdmin.get({plain: true}));

        req.session.save(() => {
            req.session.isLoggedIn = true,
            req.session.user_id = newAdmin.id

            res.render("home", {
                isLoggedIn: req.session.isLoggedIn
            })
        })

    }catch(err){
        console.log(err);
        res.json(err)
    }
})

router.post("/admin/check", async (req, res) => {
    try{
        let checkUser = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!checkUser){
            res.status(404).json({msg: "Invalid"})
        }

        let validatePassword = checkUser.authPassword(req.body.password)

        if(!validatePassword){
            res.status(400).json({msg: "Invalid"})
        }

        req.session.save(() => {
            req.session.isLoggedIn = true,
            req.session.user_id = checkUser.id

            res.render("home", {
                isLoggedIn: req.session.isLoggedIn
            })
        })


    }catch(err){
        console.log(err);
        res.json(err);
    }
})

router.post("/admin/exit", async (req, res) => {
    try{
        if(req.session.isLoggedIn){
            req.session.destroy(() => {
                res.status(204).end()
            })
        }
    }catch(err){
        console.log(err);
        res.json(err)
    }
})

router.post("/admin/new-proj", async (req, res) => {
    try{
        let {title, description, image, link} = req.body;

        let projImage = await cloudinary.uploader.upload(image, options)

        let sizedImage = await cloudinary.uploader.explicit(projImage.public_id, {
            type: "upload",
                eager: [{width: 600, height: 400}]
        })
        console.log(sizedImage);

        let newProj = await Project.create({
            title,
            description,
            link,
            image: sizedImage.eager[0].secure_url
        })
        console.log(newProj);

        res.json(newProj);

    }catch(err){
        console.log(err);
        res.json(err);
    }
})

module.exports = router;