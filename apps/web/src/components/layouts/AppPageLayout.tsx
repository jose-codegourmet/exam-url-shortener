import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type AppPageLayoutProps = {
	rightHeaderSlot?: ReactNode;
	children: ReactNode;
	logoClassName?: string;
	headerClassName?: string;
	contentClassName?: string;
	rootClassName?: string;
	decoration?: ReactNode;
};

export default function AppPageLayout({
	rightHeaderSlot,
	children,
	logoClassName,
	headerClassName,
	contentClassName,
	rootClassName,
	decoration,
}: AppPageLayoutProps) {
	return (
		<div
			className={cn(
				"relative min-h-screen overflow-hidden bg-background text-on-background",
				rootClassName,
			)}
		>
			{decoration}
			<header className={cn("relative z-10 bg-background", headerClassName)}>
				<div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-6">
					<Link
						className={cn(
							"font-heading text-2xl font-black tracking-[0.2em] text-electric-cyan uppercase",
							logoClassName,
						)}
						to="/"
					>
						SHORTCIRCUIT
					</Link>
					{rightHeaderSlot}
				</div>
			</header>
			<main
				className={cn(
					"relative z-10 mx-auto w-full max-w-[800px]",
					contentClassName,
				)}
			>
				{children}
			</main>
		</div>
	);
}
