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
import { signUpFormDefaults } from "./SignUpFormDefaults";
import { type SignUpFormValues, signUpFormSchema } from "./SignUpFormSchema";

type SignUpFormProps = {
	onSubmit?: (values: SignUpFormValues) => void | Promise<void>;
	isSubmitting?: boolean;
	submitError?: string;
	submitMessage?: string;
};

export default function SignUpForm({
	onSubmit,
	isSubmitting = false,
	submitError,
	submitMessage,
}: SignUpFormProps) {
	const form = useForm<SignUpFormValues>({
		defaultValues: signUpFormDefaults,
	});

	const handleSubmit = async (values: SignUpFormValues) => {
		const parsed = signUpFormSchema.safeParse(values);
		if (!parsed.success) {
			for (const issue of parsed.error.issues) {
				const field = issue.path[0];
				if (
					field === "email" ||
					field === "password" ||
					field === "repeatPassword"
				) {
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
									<div className="group relative">
										<Input
											required
											className="h-12 rounded-none border-border-subtle bg-background pr-10 pl-4 font-code-accent text-base text-primary placeholder:text-muted-gray/70 focus-visible:border-electric-cyan focus-visible:ring-0"
											placeholder="USER@TERMINAL.SYS"
											type="email"
											{...field}
										/>
										<span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-gray group-focus-within:text-electric-cyan">
											alternate_email
										</span>
									</div>
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
								<Label className="font-code-accent text-[10px] tracking-[0.18em] text-muted-gray uppercase">
									CREATE_PASSWORD
								</Label>
								<FormControl>
									<div className="group relative">
										<Input
											required
											className="h-12 rounded-none border-border-subtle bg-background pr-10 pl-4 font-code-accent text-base text-primary placeholder:text-muted-gray/70 focus-visible:border-electric-cyan focus-visible:ring-0"
											placeholder="********"
											type="password"
											{...field}
										/>
										<span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-gray group-focus-within:text-electric-cyan">
											key
										</span>
									</div>
								</FormControl>
								<FormMessage className="font-code-accent text-[10px] tracking-[0.08em] uppercase" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="repeatPassword"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<Label className="font-code-accent text-[10px] tracking-[0.18em] text-muted-gray uppercase">
									REPEAT_PASSWORD
								</Label>
								<FormControl>
									<div className="group relative">
										<Input
											required
											className="h-12 rounded-none border-border-subtle bg-background pr-10 pl-4 font-code-accent text-base text-primary placeholder:text-muted-gray/70 focus-visible:border-electric-cyan focus-visible:ring-0"
											placeholder="********"
											type="password"
											{...field}
										/>
										<span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-gray group-focus-within:text-electric-cyan">
											shield
										</span>
									</div>
								</FormControl>
								<FormMessage className="font-code-accent text-[10px] tracking-[0.08em] uppercase" />
							</FormItem>
						)}
					/>

					<Button
						className="zap-flicker h-14 w-full rounded-none bg-electric-cyan font-heading text-[1.7rem] font-black tracking-tight text-background uppercase hover:bg-electric-cyan/90"
						disabled={isSubmitting}
						type="submit"
					>
						INITIALIZE ACCESS
					</Button>
					{submitError ? (
						<p className="font-code-accent text-[10px] tracking-[0.08em] text-destructive uppercase">
							{submitError}
						</p>
					) : null}
					{submitMessage ? (
						<p className="font-code-accent text-[10px] tracking-[0.08em] text-electric-cyan uppercase">
							{submitMessage}
						</p>
					) : null}
				</form>
			</Form>

			<div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
				<span className="font-code-accent text-[10px] tracking-[0.12em] text-muted-gray uppercase">
					STATUS: DISCONNECTED
				</span>
				<Link
					className="font-code-accent text-[10px] tracking-[0.12em] text-electric-cyan uppercase hover:underline"
					to="/login"
				>
					ALREADY_REGISTERED?
				</Link>
			</div>
		</>
	);
}
