import { Router, type IRouter } from "express";
import healthRouter from "./health";
import distributorsRouter from "./distributors";
import catalogRouter from "./catalog";
import regionsRouter from "./regions";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/distributors", distributorsRouter);
router.use("/catalog", catalogRouter);
router.use("/regions", regionsRouter);

export default router;
