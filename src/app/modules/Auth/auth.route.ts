import express, { NextFunction, Request, Response } from 'express'
import { AuthControllers } from './auth.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from './auth.constance'
import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const router = express.Router()

// signup user
router.post(
  '/signup',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded')
    }
    req.body = JSON.parse(req.body.data)

    next()
  },
  AuthControllers.singupUser,
)

// singin in login
router.post('/login', AuthControllers.loginUser)

// chnage password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.changePassword,
)

// refrsh token
router.post('/refresh-token', AuthControllers.refreshToken)

router.post('/forget-password', AuthControllers.forgetPassword)

router.post('/reset-password', AuthControllers.resetPassword)

export const AuthRoutes = router