const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModels')
const jwt = require('jsonwebtoken')

async function passwordResetController(req, res) {
  try {
    const { email } = req.body

    if (!email) {
      throw new Error("Please provide email")
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    const resetToken = await bcrypt.genSalt(10)
    const hashedResetToken = await bcrypt.hash(resetToken, 10)

    user.resetToken = hashedResetToken
    user.resetTokenExpiry = Date.now() + 3600000 // 1 hour expiration

    await user.save()

    // Send the reset token to the user's email
    // You can use a library like nodemailer to send emails

    res.json({
      message: "Password reset link sent to your email",
      success: true,
      error: false
    })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    })
  }
}

module.exports = passwordResetController