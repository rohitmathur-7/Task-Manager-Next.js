"use client";

import Link from "next/link";
import { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";

const Projects = () => {
	const { projects, addProject } = useProjects();
	const [newProjectName, setNewProjectName] = useState("");
	const [showAddProjectName, setShowAddProjectName] = useState(false);

	return (
		<div>
			<Link href="/">Home</Link>
			<h1>All Projects</h1>
			<ul>
				{projects.map((project) => (
					<li key={project.id}>
						<Link
							href={`/projects/${project.name.toLowerCase().replaceAll(" ", "-")}`}
						>
							{project.name}
						</Link>
					</li>
				))}
			</ul>

			<button onClick={() => setShowAddProjectName(true)}>Add Project</button>
			{showAddProjectName && (
				<>
					<input
						type="text"
						placeholder="Project Name"
						value={newProjectName}
						onChange={(e) => setNewProjectName(e.target.value)}
					/>
					<button onClick={() => addProject(newProjectName)}>Add</button>
				</>
			)}
		</div>
	);
};

export default Projects;
