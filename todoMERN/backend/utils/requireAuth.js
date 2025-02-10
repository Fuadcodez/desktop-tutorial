import { server } from '../server.js'
import { taskUser } from '../schema/taskUsersSchema.js'

const requireAuth = async (req, res) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  try {
    const  {id}  = server.jwt.verify(token)
    // console.log(id, )
    const user = await taskUser.findOne({ _id: id }).select('_id');
    if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }
      console.log(user)
    req.user = user
  

  } catch (error) {
    console.log(error)
    res.status(401).send({message: 'Request is not authorized'})
  }
}

export default requireAuth