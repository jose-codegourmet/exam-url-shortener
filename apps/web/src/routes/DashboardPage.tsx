import { useNavigate } from "react-router-dom";
import AppPageLayout from "@/components/layouts/AppPageLayout";
import LinkVaultTable from "@/components/shortener/LinkVaultTable";
import ShortenUrlForm from "@/components/shortener/ShortenUrlForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dashboardStats = [
	{ label: "LINKS_GENERATED", value: "1,204", cyan: false },
	{ label: "DATA_COMPRESSED", value: "84.2%", cyan: true },
];

export default function DashboardPage() {
	const navigate = useNavigate();

	return (
		<AppPageLayout
			contentClassName="px-6 pt-12 pb-24"
			headerClassName="border-b-2 border-border-subtle"
			logoClassName="italic"
			rightHeaderSlot={
				<DropdownMenu>
					<DropdownMenuTrigger
						className="size-10 rounded-none border-2 border-electric-cyan bg-surface-elevated font-heading text-sm text-electric-cyan outline-none transition hover:bg-electric-cyan/10"
						aria-label="Account menu"
					>
						JD
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-48 rounded-none border border-border-subtle bg-surface p-1 text-on-background"
						align="end"
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="font-code-accent text-xs tracking-[0.15em] text-muted-gray uppercase">
								John Doe
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator className="bg-border-subtle" />
						<DropdownMenuItem
							className="cursor-pointer rounded-none font-code-accent text-xs tracking-[0.15em] text-electric-cyan uppercase focus:bg-electric-cyan/10 focus:text-electric-cyan"
							onClick={() => navigate("/")}
						>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			}
		>
			<section className="mb-8">
				<Card className="relative rounded-none border border-border-subtle bg-surface py-0">
					<div className="pointer-events-none absolute top-0 right-0 p-2 opacity-10">
						<span className="material-symbols-outlined text-[120px]">bolt</span>
					</div>
					<CardContent className="space-y-4 p-6">
						<h1 className="font-heading text-5xl leading-none font-bold text-primary uppercase md:text-6xl">
							PASTE LINK.{" "}
							<span className="text-electric-cyan italic">
								KILL THE LENGTH.
							</span>
						</h1>
						<ShortenUrlForm
							className="flex flex-col gap-0 border-2 border-border-subtle md:flex-row"
							placeholder="HTTPS://TARGET-SYSTEM.COM/PATH/DATA"
						/>
						<p className="font-code-accent text-[12px] tracking-[0.2em] text-muted-gray uppercase">
							SYSTEM STATUS: OPTIMIZED // HIGH VOLTAGE REDUCTION ACTIVE
						</p>
					</CardContent>
				</Card>
			</section>

			<div className="mb-8 grid grid-cols-2 gap-2">
				{dashboardStats.map((stat) => (
					<Card
						className="rounded-none border border-border-subtle bg-surface py-0"
						key={stat.label}
					>
						<CardContent className="p-4">
							<p className="font-code-accent text-[10px] tracking-[0.15em] text-muted-gray uppercase">
								{stat.label}
							</p>
							<p
								className={`font-heading text-4xl font-bold ${
									stat.cyan ? "text-electric-cyan" : "text-primary"
								}`}
							>
								{stat.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<section>
				<div className="mb-2 flex items-center justify-between">
					<h2 className="flex items-center gap-3 font-heading text-4xl font-bold text-primary uppercase">
						<span className="h-8 w-2 bg-electric-cyan" />
						LINK_VAULT
					</h2>
					<div className="flex gap-2">
						<Button
							className="rounded-none border border-border-subtle bg-transparent text-muted-gray hover:border-electric-cyan hover:text-electric-cyan"
							size="icon"
							type="button"
							variant="ghost"
						>
							<span className="material-symbols-outlined">filter_list</span>
						</Button>
						<Button
							className="rounded-none border border-border-subtle bg-transparent text-muted-gray hover:border-electric-cyan hover:text-electric-cyan"
							size="icon"
							type="button"
							variant="ghost"
						>
							<span className="material-symbols-outlined">refresh</span>
						</Button>
					</div>
				</div>
				<LinkVaultTable />
			</section>

			<footer className="mt-20 border-t border-border-subtle pt-8 text-center">
				<p className="font-code-accent text-[10px] tracking-[0.5em] text-muted-gray/40 uppercase">
					EFFICIENCY IS NOT A CHOICE. IT IS A REQUIREMENT.
				</p>
			</footer>

			<nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t-2 border-border-subtle bg-background md:hidden">
				<Button
					className="flex h-auto flex-col rounded-none border-t-2 border-electric-cyan bg-surface px-6 py-2 text-electric-cyan"
					type="button"
					variant="ghost"
				>
					<span className="material-symbols-outlined">link</span>
					<span className="font-heading text-[10px] font-black tracking-tight uppercase">
						LINKS
					</span>
				</Button>
				<Button
					className="flex h-auto flex-col rounded-none px-6 py-2 text-muted-gray hover:text-electric-cyan"
					type="button"
					variant="ghost"
				>
					<span className="material-symbols-outlined">bolt</span>
					<span className="font-heading text-[10px] font-black tracking-tight uppercase">
						ZAP
					</span>
				</Button>
				<Button
					className="flex h-auto flex-col rounded-none px-6 py-2 text-muted-gray hover:text-electric-cyan"
					type="button"
					variant="ghost"
				>
					<span className="material-symbols-outlined">settings</span>
					<span className="font-heading text-[10px] font-black tracking-tight uppercase">
						SYSTEM
					</span>
				</Button>
			</nav>
		</AppPageLayout>
	);
}
