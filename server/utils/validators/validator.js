const { body } = require("express-validator");
const { User } = require("../../models/usersModel");

exports.validator = [
  body("email")
    .isEmail()
    .withMessage(`invalid email`)
    .custom(async (val, { req }) => {
      const data = await User.find({ email: req.body.email });
      if (data.length !== 0)
        throw new Error(
          `this email is already registered try with different email`
        );
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("minimum password length is 8")
    .isLength({ max: 16 })
    .withMessage("maximum password length is 16")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "password must contains at least 1 number, 1 capital letter, 1 small letter, 1 special character"
    ),
  body("confirmPassword").custom((val, { req }) => {
    if (req.body.password !== val) throw new Error("password not much");
    return true;
  }),
];
