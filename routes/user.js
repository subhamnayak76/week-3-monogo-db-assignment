const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    User.create({
        username,
        password
    })
        .then(() => {
            res.json({
                msg: "User is created succesfully"
            })
        })
        .catch(() => {
            res.json({
                msg: "No user is created"
            })
        })


});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    User.find({})
        .then((response) => {
            res.json({
                course: response
            })
        })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username = req.headers.username
    User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourse: courseId
        }
    })
        .then(() => {
            res.json({
                msg: "Course in purchased"
            })
        })
        .catch(() => {
            res.json({
                msg: "error "
            })
        })

});

router.get('/purchasedCourse', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });


    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router