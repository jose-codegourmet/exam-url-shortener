import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";

const router: Router = Router();

router.post(
	"/",
	(_request: Request, _response: Response, _next: NextFunction) => {
		throw new Error("Not implemented.");
	},
);

export default router;
