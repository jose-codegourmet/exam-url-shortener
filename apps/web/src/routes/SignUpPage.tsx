import SignUpForm from "@/components/auth/sign-up-form/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUpPage() {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10 text-on-background">
			<div className="pointer-events-none absolute inset-0 z-0 opacity-10">
				<div className="absolute top-1/2 left-1/2 h-px w-[800px] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] bg-electric-cyan" />
				<div className="absolute top-1/2 left-1/2 h-px w-[800px] -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] bg-electric-cyan" />
			</div>

			<section className="relative z-10 w-full max-w-[440px] pb-24">
				<div className="mb-8 flex justify-center">
					<div className="flex h-16 w-16 items-center justify-center bg-surface-elevated font-heading text-xs font-bold leading-none tracking-tight text-electric-cyan uppercase">
						<div className="text-center">
							SHORT
							<br />
							CIRCUIT
						</div>
					</div>
				</div>

				<header className="mb-8 text-center">
					<h1 className="font-heading text-5xl font-bold tracking-tighter text-primary uppercase">
						JOIN THE SYSTEM<span className="text-electric-cyan">.</span>
					</h1>
					<p className="mt-1 font-code-accent text-sm tracking-[0.18em] text-electric-cyan uppercase">
						NO PERMISSION REQUIRED. JUST DATA.
					</p>
				</header>

				<Card className="relative gap-0 overflow-visible rounded-none border border-border-subtle bg-surface py-0 ring-0 shadow-2xl">
					<div className="absolute top-0 left-0 h-2 w-2 -translate-x-1 -translate-y-1 border-t-2 border-l-2 border-electric-cyan" />
					<div className="absolute top-0 right-0 h-2 w-2 translate-x-1 -translate-y-1 border-t-2 border-r-2 border-electric-cyan" />
					<div className="absolute bottom-0 left-0 h-2 w-2 -translate-x-1 translate-y-1 border-b-2 border-l-2 border-electric-cyan" />
					<div className="absolute right-0 bottom-0 h-2 w-2 translate-x-1 translate-y-1 border-r-2 border-b-2 border-electric-cyan" />

					<CardContent className="space-y-4 p-8">
						<SignUpForm />
					</CardContent>
				</Card>

				<p className="mx-auto mt-8 max-w-[300px] text-center font-code-accent text-[10px] leading-relaxed tracking-[0.18em] text-muted-gray/50 uppercase">
					BY INITIALIZING, YOU ACCEPT ALL TERMS OF SHRED_TERMS. ALL DATA
					TRANSMISSION IS FINAL.
				</p>
			</section>

			<footer className="fixed bottom-0 left-0 z-20 w-full border-t border-border-subtle bg-background">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-8 py-6 md:flex-row">
					<div className="font-code-accent text-[10px] tracking-[0.2em] text-muted-gray uppercase">
						© 2024{" "}
						<span className="font-black text-electric-cyan">SHORTCIRCUIT</span>.
						NO PERMISSION REQUIRED.
					</div>
					<nav className="flex gap-8">
						<a
							className="font-code-accent text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-white"
							href="#"
						>
							SYSTEM_STATUS
						</a>
						<a
							className="font-code-accent text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-white"
							href="#"
						>
							API_DOCS
						</a>
						<a
							className="font-code-accent text-[10px] tracking-[0.2em] text-muted-gray uppercase transition-colors hover:text-white"
							href="#"
						>
							SHRED_TERMS
						</a>
					</nav>
				</div>
			</footer>
		</div>
	);
}
