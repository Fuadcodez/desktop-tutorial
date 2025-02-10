import { taskUser } from "../schema/taskUsersSchema.js";
import { createHash, confirmPassword } from "../utils/taskUserPassword.js";
import { server } from "../server.js";
const createTaskUsers = async (req, res)=>{
    const {email, password} = req.body
 const checkUser = await taskUser.findOne({ email})
 if(checkUser) return res.status(400).send({message: 'User already exists'})
    const {hashPassword, salt} = await createHash(password)
    const newUser = await taskUser.create({email: email, password: hashPassword, salt})
    res.status(201).send(newUser)
}
const loginTaskUsers = async (req, res)=>{
    const {email, password} = req.body
    const checkUser = await taskUser.findOne({email})
    if(!checkUser) return res.status(404).send({message: 'User not found'});
    const passwordConfirm = await confirmPassword(checkUser.password, checkUser.salt, password);
    if (!passwordConfirm) return res.status(404).send({message: 'invalid credentials'});
    const token = server.jwt.sign({ id: checkUser._id }, {expiresIn: '1d'})
    res.status(200).send({email, token});
}
export { createTaskUsers, loginTaskUsers}