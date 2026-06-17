import {Router} from  'express'
import {registerController,loginController,refreshTokenController, logoutController,verifiyEmailController} from "./auth.controller.js"
import auth from '../../common/middleware/auth.middleware.js'
import adminOnly from '../../common/middleware/admin.middleware.js'
import {registerValidation,
  loginValidation,
  refreshTokenValidation,
  logoutValidation} from "./auth.validation.js"

const router = Router()


router.post("/register",registerValidation,registerController)
router.post("/login",loginValidation,loginController)
router.post("/refresh-token", refreshTokenValidation,refreshTokenController);

router.get("/admin-test", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" })
})


router.post("/logout",logoutValidation, logoutController);

router.get("/verify-email/:token", verifiyEmailController);
export default router

