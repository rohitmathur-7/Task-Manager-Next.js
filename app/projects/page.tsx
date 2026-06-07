import Link from "next/link";
import projects from "../data/projects";
import { useState } from "react";

const Projects = () => {
	const [projectsData, setProjectsData] = useState([
		{
			id: "1",
			name: "Website Redesign",
			tasks: { title: "Create Navbar", status: "todo" },
		},
		{
			id: "2",
			name: "Learn Next.js",
			tasks: { title: "Watch video on next js", status: "todo" },
		},
	]);

	return (
		<div>
			<Link href="/">Home</Link>
			<h1>All Projects</h1>
			<ul>
				{projectsData.map((project) => (
					<li key={project.id}>
						<Link href={`/projects/${project.id}`}>{project.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Projects;
