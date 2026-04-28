import { z } from "zod";

export const signUpFormSchema = z
	.object({
		email: z
			.string()
			.trim()
			.min(1, "EMAIL_ADDRESS is required.")
			.email("Enter a valid email address."),
		password: z
			.string()
			.min(8, "CREATE_PASSWORD must be at least 8 characters."),
		repeatPassword: z.string().min(1, "REPEAT_PASSWORD is required."),
	})
	.refine((values) => values.password === values.repeatPassword, {
		message: "Passwords do not match.",
		path: ["repeatPassword"],
	});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
