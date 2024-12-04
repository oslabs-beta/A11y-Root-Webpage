import express from 'express';
import UserController from '../controllers/userController';

const userRoute = express.Router();

// userRoute.get('/', async(req, res, next) => {
// 	try{
// 		await res.status(200).sendFile(path.join(__dirname, ''));
// 	} catch(err) {
// 		return next({
// 			log: `userRoute Error: ${err}`,
//       status: 500,
//       message: 'Error occurred in userRoute',
// 		})
// 	}
// })

userRoute.get('/:githubId', UserController.getUser, (req, res) => {
	res.status(200).json(res.locals.user);
})

userRoute.post('/', UserController.postUser, (req, res) => {
	res.status(200).json(res.locals.user);
})

userRoute.patch('/', UserController.updateUser, (req, res) => {
	res.status(200).json(res.locals.user);
})

userRoute.delete('/:githubId', UserController.deleteUser, (req, res) => {
	res.status(200).json(res.locals.user)
})

export default userRoute;