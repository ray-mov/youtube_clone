import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiRespones.js";



const registerUser = asyncHandler(async (req, res) => {

  const { fullName, email, username, password } = req.body;

  //validations

  if (
    [fullName, email, username, password].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All feilds are not filled")
  }

  const isUserAlreadyExist = User.findOne({
    $or: [{ username }, { email }]
  })

  if (isUserAlreadyExist) {
    throw new ApiError(409, "User already exist")
  }

  //-----file handling ------------------------

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(4090, "Avatar Required")
  }

  const avatarCloud = await uploadOnCloudinary(avatarLocalPath)
  const coverImageCloude = await uploadOnCloudinary(coverImageLocalPath)


  if (!avatarCloud) {
    throw new ApiError(4090, "Avatar Required")
  }


  const user = await User.create({
    fullName,
    avatar: avatarCloud.url,
    username: username.toLowerCase(),
    email,
    password,
    coverImage: coverImageCloude?.url || "",

  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshedToken"
  )


  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registration")

  }

  return res.status(200).json(new ApiResponse(200, createdUser, "User Created Successfully"));


})

export { registerUser }