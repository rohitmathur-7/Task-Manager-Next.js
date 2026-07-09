import type { Metadata } from "next";
import "./globals.css";
import { ProjectsProvider } from "@/context/ProjectsContext";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Task Manager",
	description: "Task Manager App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full antialiased">
			<ProjectsProvider>
				<body
					className="min-h-full max-w-[1280px] m-auto"
					suppressHydrationWarning
				>
					<header className="flex justify-between mt-8">
						<Link href="/">Task Manager</Link>
						<div className="flex gap-8">
							<input placeholder="Search..." />
							<div className="flex gap-4">
								<button className="pointer">Settings</button>
								<button className="pointer">Profile</button>
							</div>
						</div>
					</header>
					<div className="my-4 flex gap-6">
						<aside className="flex flex-col items-start">
							<Link href="/">Dashboard</Link>
							<Link href="/projects/">Projects</Link>
							<Link href="/tasks/">Tasks</Link>
						</aside>
						<main className="flex-1">{children}</main>
					</div>
					<footer>
						<p>This is the footer</p>
					</footer>
				</body>
			</ProjectsProvider>
		</html>
	);
}
