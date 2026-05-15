const UserModel = require('../Model/User.Model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.getUser = async (req, res) => {
    const user = await UserModel.findAll();
    res.json(user)
}
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
exports.createUser = async (req, res) => {
    const { firstname, lastname, email, address, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const user = await UserModel.create(firstname, lastname, email, address, hashedPassword)
    res.json(user)

};
exports.deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.delete(id)
    res.json(user)
}
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
    if (!user.length) return res.status(404).send("User not found");
    const IsPassword = await bcrypt.compare(password, user[0].password);
    if (!IsPassword) {
        return res.status(401).send("Password doesnot match");
    }
    const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.SECRETKEY,
        { expiresIn: "2h" },
    );
    return res
        .status(201)
        .json({ message: "Login successfull", token: token, user: user });
};
