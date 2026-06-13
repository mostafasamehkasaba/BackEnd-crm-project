import {Router} from  'express'
import {registerController,loginController,refreshTokenController, logoutController} from "./auth.controller.js"
import auth from '../../common/middleware/auth.middleware.js'
import adminOnly from '../../common/middleware/admin.middleware.js'

const router = Router()


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/refresh-token", refreshTokenController);

router.get("/admin-test", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" })
})
router.post("/logout", logoutController);
export default router

