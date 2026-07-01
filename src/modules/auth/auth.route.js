import {Router} from  'express'
import {registerController,loginController,refreshTokenController, logoutController,verifiyEmailController, getUsers} from "./auth.controller.js"
import auth from '../../common/middleware/auth.middleware.js'
import adminOnly from '../../common/middleware/admin.middleware.js'
import { getAllUsers } from './auth.service.js'
// import {registerValidation,
//   loginValidation,
//   refreshTokenValidation,
//   logoutValidation} from "./auth.validation.js"

const router = Router()


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/refresh-token",refreshTokenController);

router.get("/admin-test", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" })
})

router.get("/users", getUsers);;

router.post("/logout", logoutController);

router.get("/verify-email/:token", verifiyEmailController);
export default router

