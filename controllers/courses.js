const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const Exports = require('node-geocoder');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:BootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const query = await Course.find({ bootcamp: req.params.bootcampId });

        res.status(200).json({ success: true, count: courses.length, data: courses });
    } else {
        res.status(200).json(res.advancedResults);
    }
});


// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name, description'
    });

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: course });
});


// @desc    Add course
// @route   POST /api/v1/courses/bootcamps/:bootcampId/courses
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404));
    }

    // Make sure is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} doesn't have access to add this course to bootcamp ${bootcamp.id}`, 404))
    }

    const course = await Course.create(req.body);

    res.status(200).json({ success: true, data: course });
});


// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
    }

    // Make sure is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} doesn't have access to update this course`, 404))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: course });
});


// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
    }

    // Make sure is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} doesn't have access to delete this course`, 404))
    }

    await course.remove();

    res.status(200).json({ success: true, data: course });
});