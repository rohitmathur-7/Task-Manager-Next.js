import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>Task Manager</h1>
			<Link href="/projects">View Projects</Link>
		</div>
	);
}
