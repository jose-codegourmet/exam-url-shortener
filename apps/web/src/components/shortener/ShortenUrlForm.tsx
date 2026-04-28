import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const shortenSchema = z.object({
	url: z.string().trim().url("Enter a valid URL (include https://)."),
});

type ShortenUrlFormValues = z.infer<typeof shortenSchema>;

type ShortenUrlFormProps = {
	className?: string;
	onSubmit?: (value: ShortenUrlFormValues) => void | Promise<void>;
	buttonLabel?: string;
	placeholder?: string;
};

export default function ShortenUrlForm({
	className,
	onSubmit,
	buttonLabel = "ZAP IT",
	placeholder = "HTTPS://TARGET-SYSTEM.COM/PATH/DATA",
}: ShortenUrlFormProps) {
	const form = useForm<ShortenUrlFormValues>({
		defaultValues: {
			url: "",
		},
	});

	const handleSubmit = async (values: ShortenUrlFormValues) => {
		const parsed = shortenSchema.safeParse(values);
		if (!parsed.success) {
			const issue = parsed.error.issues[0];
			if (issue) {
				form.setError("url", { message: issue.message });
			}
			return;
		}

		await onSubmit?.(values);
	};

	return (
		<Form {...form}>
			<form
				className={className}
				onSubmit={(event) => {
					void form.handleSubmit(handleSubmit)(event);
				}}
			>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="w-full space-y-2">
							<FormControl>
								<div className="flex h-14 items-center bg-background px-3">
									<span className="material-symbols-outlined mr-2 text-muted-gray">
										link
									</span>
									<Input
										className="h-full rounded-none border-0 bg-transparent px-0 font-code-accent text-electric-cyan uppercase shadow-none focus-visible:ring-0"
										placeholder={placeholder}
										type="url"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage className="font-code-accent text-xs uppercase" />
						</FormItem>
					)}
				/>
				<Button
					className="h-14 rounded-none bg-electric-cyan px-10 font-heading text-xl font-semibold tracking-[0.2em] text-background uppercase"
					type="submit"
				>
					{buttonLabel}
					<span
						aria-hidden
						className="material-symbols-outlined"
						style={{ fontVariationSettings: "'FILL' 1" }}
					>
						bolt
					</span>
				</Button>
			</form>
		</Form>
	);
}
