const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const User = require("../models/User");
const { rolls } = require("../utils/constant");

// @desc          Get All Bootcamps
// @route         GET /api/v1/bootcamps
// @access        Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorResponse(`No User founders`, 404));
  }
  res.status(201).json({
    success: true,
    data: users,
  });
});

// @desc          Get All Bootcamps
// @route         GET /api/v1/bootcamps
// @access        Public
exports.getAllTopSkills = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    success: true,
    data: rolls,
  });
});

// @desc          Get Single Bootcamps
// @route         GET /api/v1/bootcamps/:id
// @access        Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`Bootcamp Not Found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc          Create new Bootcamp
// @route         POST /api/v1/bootcamps
// @access        Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const response = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: response,
  });
});

// @desc          Update Bootcamp
// @route         UPDATE /api/v1/bootcamps/:id
// @access        Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`Bootcamp Not Found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

// @desc          Delete Bootcamp
// @route         DELETE /api/v1/bootcamps/:id
// @access        Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`Bootcamp Not Found with id of ${req.params.id}`, 404)
    );
  }

  user.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc          Upload Bootcamp Photo
// @route         PUT /api/v1/bootcamps/:id/photo
// @access        Private
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User Not Found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please Upload a File`, 400));
  }

  const file = req.files.file;

  // Make sure image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please Upload a Valid Image`, 400));
  }

  // Create Custom File Name
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  // Upload the file
  file.mv(`public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
