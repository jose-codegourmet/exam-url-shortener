import { z } from "zod";

export const loginFormSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "EMAIL_ADDRESS is required.")
		.email("Enter a valid email address."),
	password: z.string().min(1, "PASSWORD is required."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
