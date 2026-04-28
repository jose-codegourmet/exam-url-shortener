import { Bolt } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormDefaults } from "./LoginFormDefaults";
import { type LoginFormValues, loginFormSchema } from "./LoginFormSchema";

type LoginFormProps = {
	onSubmit?: (values: LoginFormValues) => void | Promise<void>;
	isSubmitting?: boolean;
	submitError?: string;
};

export default function LoginForm({
	onSubmit,
	isSubmitting = false,
	submitError,
}: LoginFormProps) {
	const form = useForm<LoginFormValues>({
		defaultValues: loginFormDefaults,
	});

	const handleSubmit = async (values: LoginFormValues) => {
		const parsed = loginFormSchema.safeParse(values);
		if (!parsed.success) {
			for (const issue of parsed.error.issues) {
				const field = issue.path[0];
				if (field === "email" || field === "password") {
					form.setError(field, { message: issue.message });
				}
			}
			return;
		}

		await onSubmit?.(values);
	};

	return (
		<>
			<Form {...form}>
				<form
					className="space-y-4"
					onSubmit={(event) => {
						void form.handleSubmit(handleSubmit)(event);
					}}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<Label className="font-code-accent text-[10px] tracking-[0.18em] text-muted-gray uppercase">
									EMAIL_ADDRESS
								</Label>
								<FormControl>
									<Input
										required
										className="h-12 rounded-none border-border-subtle bg-background px-4 font-code-accent text-base text-primary placeholder:text-muted-gray/70 focus-visible:border-electric-cyan focus-visible:ring-0"
										placeholder="ID@CORE_SYSTEM.PRO"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage className="font-code-accent text-[10px] tracking-[0.08em] uppercase" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<div className="flex items-center justify-between">
									<Label className="font-code-accent text-[10px] tracking-[0.18em] text-muted-gray uppercase">
										PASSWORD
									</Label>
									<a
										className="font-code-accent text-[10px] tracking-[0.12em] text-electric-cyan uppercase transition-opacity hover:opacity-80"
										href="#"
									>
										RESET_KEY
									</a>
								</div>
								<FormControl>
									<Input
										required
										className="h-12 rounded-none border-border-subtle bg-background px-4 font-code-accent text-base text-primary placeholder:text-muted-gray/70 focus-visible:border-electric-cyan focus-visible:ring-0"
										placeholder="••••••••••••"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage className="font-code-accent text-[10px] tracking-[0.08em] uppercase" />
							</FormItem>
						)}
					/>

					<Button
						className="h-14 w-full rounded-none bg-electric-cyan font-heading text-[1.7rem] font-black tracking-tight text-background uppercase hover:bg-electric-cyan/90"
						disabled={isSubmitting}
						type="submit"
					>
						LOGIN_SYSTEM <Bolt className="size-5" />
					</Button>
					{submitError ? (
						<p className="font-code-accent text-[10px] tracking-[0.08em] text-destructive uppercase">
							{submitError}
						</p>
					) : null}
				</form>
			</Form>

			<div className="flex items-center gap-2 pt-1">
				<div className="h-px flex-1 bg-border-subtle" />
				<span className="font-code-accent text-[10px] tracking-[0.12em] text-muted-gray uppercase">
					SECURED_BY_RSA_4096
				</span>
				<div className="h-px flex-1 bg-border-subtle" />
			</div>

			<p className="text-center font-code-accent text-sm text-muted-gray">
				NEW_USER?{" "}
				<Link className="text-electric-cyan hover:underline" to="/sign-up">
					CREATE_ACCOUNT
				</Link>
			</p>
		</>
	);
}
