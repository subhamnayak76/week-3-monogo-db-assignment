const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index")
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username : username,
        password : password
    })
    .then(() => {
        res.json({
            message : 'Admin created successfully'
        })
    })
    .catch(() => {
        res.json({
            message : 'Admin is not created'
        })
    }) 
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const ImageLink = req.body.ImageLink;
    const price = req.body.price

     Course.create({
        title : title,
        description : description,
        ImageLink : ImageLink,
        price : price

    })
    .then((course) => {
        res.json({
            msg : "course are successfully created",
            courseid  : course._id
        })
    })
    .catch(() =>{
        res.json({
            msg : "course are not created"
        })
    })


    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then((response) => {
        res.json({
            course : response
        })
    })
    
});

module.exports = router;