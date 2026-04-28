import { Link } from "react-router-dom";
import AppPageLayout from "@/components/layouts/AppPageLayout";
import ShortenUrlForm from "@/components/shortener/ShortenUrlForm";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const landingStats = [
	{ label: "LATENCY", value: "0.0004ms" },
	{ label: "EFFICIENCY", value: "99.8%" },
	{ label: "NODES", value: "142 ACTIVE" },
];

export default function LandingPage() {
	return (
		<AppPageLayout
			contentClassName="px-6"
			decoration={
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-10"
					style={{
						backgroundImage:
							"radial-gradient(circle at 2px 2px, #00FFF0 1px, transparent 0)",
						backgroundSize: "40px 40px",
					}}
				/>
			}
			headerClassName="border-b border-border-subtle/50"
			rightHeaderSlot={
				<Link
					className={cn(
						buttonVariants({ variant: "default" }),
						"h-10 rounded-none bg-electric-cyan px-6 font-heading text-sm font-bold tracking-tight text-background uppercase hover:bg-electric-cyan/90",
					)}
					to="/login"
				>
					Login
				</Link>
			}
		>
			<section className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center text-center">
				<div className="mb-2 flex items-center gap-2 font-code-accent text-sm tracking-[0.2em] text-electric-cyan uppercase">
					<span className="size-2 animate-pulse bg-electric-cyan" />
					SYSTEM ACTIVE
				</div>
				<h1 className="font-heading text-6xl leading-[0.9] font-bold tracking-tighter text-primary uppercase md:text-[120px]">
					KILL THE <span className="text-electric-cyan">LENGTH.</span>
				</h1>

				<ShortenUrlForm
					buttonLabel="ZAP IT"
					className="glow-border mt-8 flex w-full flex-col gap-2 border border-border-subtle bg-surface p-1 md:flex-row"
					placeholder="PASTE LINK. KILL THE LENGTH."
				/>
				<p className="mt-4 w-full text-left font-code-accent text-xs tracking-tight text-muted-gray uppercase">
					BY PROCEEDING, YOU AGREE TO SHRED ALL UNNECESSARY METADATA.
				</p>

				<div className="mt-16 grid w-full gap-2 md:grid-cols-3">
					{landingStats.map((stat) => (
						<Card
							className="rounded-none border border-border-subtle bg-surface/50 py-0"
							key={stat.label}
						>
							<CardContent className="space-y-1 p-4 text-left">
								<p className="font-code-accent text-xs text-muted-gray uppercase">
									{stat.label}
								</p>
								<p className="font-heading text-3xl font-bold tracking-tighter text-electric-cyan">
									{stat.value}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</AppPageLayout>
	);
}
