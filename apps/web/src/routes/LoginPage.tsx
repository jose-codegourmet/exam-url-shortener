import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/auth";
import LoginForm from "@/components/auth/login-form/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
	const navigate = useNavigate();
	const loginMutation = useLoginMutation();

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-on-background">
			<div
				aria-hidden
				className="auth-grid-bg pointer-events-none absolute inset-0"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
			/>

			<header className="relative z-10 mb-8 w-full max-w-[800px] px-6 text-center">
				<h1 className="font-heading text-5xl font-bold tracking-tighter text-primary uppercase">
					INITIALIZE_SESSION.
				</h1>
				<p className="mt-1 font-code-accent text-sm tracking-[0.18em] text-electric-cyan uppercase opacity-80">
					NO PERMISSION REQUIRED. JUST DATA.
				</p>
			</header>

			<section className="relative z-10 w-full max-w-[420px] px-6">
				<Card className="relative gap-0 overflow-hidden rounded-none border border-border-subtle bg-surface py-0 ring-0">
					<div
						aria-hidden
						className="absolute top-0 right-0 h-24 w-px bg-electric-cyan"
					/>
					<div
						aria-hidden
						className="absolute top-0 right-0 h-px w-24 bg-electric-cyan"
					/>
					<CardContent className="space-y-4 p-8">
						<LoginForm
							isSubmitting={loginMutation.isPending}
							onSubmit={async (values) => {
								await loginMutation.mutateAsync({
									email: values.email,
									password: values.password,
								});
								navigate("/dashboard");
							}}
							submitError={loginMutation.error?.message}
						/>
					</CardContent>
				</Card>
			</section>

			<div className="pointer-events-none fixed top-8 left-8 hidden flex-col gap-1 opacity-20 md:flex">
				<div className="h-[2px] w-8 bg-electric-cyan" />
				<div className="h-8 w-[2px] bg-electric-cyan" />
				<p className="mt-3 font-code-accent text-[10px] leading-5 tracking-[0.12em] text-electric-cyan uppercase">
					LATENCY: 14MS
					<br />
					PORT: 8080
					<br />
					SEC: ACTIVE
				</p>
			</div>

			<div
				aria-hidden
				className="pointer-events-none absolute -right-20 -bottom-20 h-[600px] w-[600px] rounded-full bg-electric-cyan/10 blur-3xl"
			/>

			<footer className="fixed bottom-0 z-20 w-full border-t border-border-subtle bg-background px-8 py-4">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
					<div className="flex items-center gap-4">
						<span className="font-heading text-xs font-bold tracking-[0.2em] text-electric-cyan uppercase">
							SHORTCIRCUIT.
						</span>
						<span className="font-heading text-[10px] tracking-[0.2em] text-muted-gray uppercase">
							©2024 ZERO FRICTION.
						</span>
					</div>
					<nav className="flex items-center gap-6">
						<a
							className="flex items-center gap-1 font-heading text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-electric-cyan"
							href="#"
						>
							<span className="size-1.5 rounded-full bg-electric-cyan/40" />
							SYSTEM_STATUS
						</a>
						<a
							className="font-heading text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-electric-cyan"
							href="#"
						>
							API_DOCS
						</a>
						<a
							className="font-heading text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-electric-cyan"
							href="#"
						>
							TERMS_OF_SERVICE
						</a>
					</nav>
				</div>
			</footer>
		</div>
	);
}
