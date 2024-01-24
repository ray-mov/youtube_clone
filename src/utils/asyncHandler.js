const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
  }

}


// taking function as a parameter and executing it by further taking one higher order function


const asyncHandler2 = (fnuc) => async (req, res, next) => {
  try {
    await fnuc(req, res, next)
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message
    })
  }

}
export { asyncHandler, asyncHandler2 }