import { Router } from "express";
import { UserRouter } from "./User.router.js";
import { DeviceRouter } from "./Device.router.js";
import { DeviceInfoRouter } from "./DeviceInfo.router.js";


const Routes = Router();

Routes.use('/user', UserRouter);
Routes.use('/device', DeviceRouter);
Routes.use('/deviceInfo', DeviceInfoRouter);

export { Routes }