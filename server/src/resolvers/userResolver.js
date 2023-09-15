const bcrypt = require("bcryptjs");
const { User } = require("../models/User")
const jwt = require("jsonwebtoken")

const userResolver = {
    Query: {
        userLogin: async (_, args) => {
            const { email, password } = args.input;
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error("Auth failed, user not found")
            }
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) {
                throw new Error("Incorrect password")
            }
            const token = jwt.sign({
                id: user.id,
                email,
                firstname: user.firstName,
                lastName: user.lastName
            },
                "JWT_SECRET"
            )
            return { user, token }
        },

        userAuth: async (_, args, { context }) => {
            const { user } = context
            if (!user) {
                throw new Error("Auth failed, user not found")
            }
            const userInfo = await User.findById(user.id)
            if (userInfo) {
                return userInfo
            }
        },

        getAllUsers: async () => {
            const users = await User.find({})
            return users
        }
    },
    Mutation: {
        userSignUp: async (_, { input }) => {
            const hashedPassword = bcrypt.hashSync(input.password)
            const newUser = new User({
                ...input,
                password: hashedPassword
            });

            const alreadySignedUp = await User.findOne({ email: newUser.email });
            if (alreadySignedUp) {
                throw new Error('User with this email already exists');
            }
            const savedUser = await newUser.save();
            return savedUser;
        },
    },

}


module.exports = userResolver