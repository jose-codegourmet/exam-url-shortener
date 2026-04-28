import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { supabase } from "../lib/supabase";

const authBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const router: Router = Router();

router.post(
	"/login",
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const parsedBody = authBodySchema.safeParse(request.body);
			if (!parsedBody.success) {
				response.status(400).json({
					error: "Invalid payload. Provide a valid email and password.",
				});
				return;
			}

			const { email, password } = parsedBody.data;
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				response.status(401).json({ error: error.message });
				return;
			}

			response.status(200).json({
				message: "Login successful.",
				user: data.user,
				session: data.session,
			});
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	"/signup",
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const parsedBody = authBodySchema.safeParse(request.body);
			if (!parsedBody.success) {
				response.status(400).json({
					error: "Invalid payload. Provide a valid email and password.",
				});
				return;
			}

			const { email, password } = parsedBody.data;
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				response.status(400).json({ error: error.message });
				return;
			}

			if (data.user?.id) {
				await prisma.profile.upsert({
					where: { id: data.user.id },
					update: { email: data.user.email ?? email },
					create: {
						id: data.user.id,
						email: data.user.email ?? email,
					},
				});
			}

			response.status(200).json({
				message:
					data.session === null
						? "Signup successful. Please check your email for confirmation."
						: "Signup successful.",
				user: data.user,
				session: data.session,
			});
		} catch (error) {
			next(error);
		}
	},
);

export default router;
