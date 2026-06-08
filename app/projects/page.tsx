"use client";

import Link from "next/link";
import { useState } from "react";
import useProjects from "../../hooks/useProjects";

const Projects = () => {
	const { projects, setProjects } = useProjects();
	const [newProjectName, setNewProjectName] = useState("");
	const [showAddProjectName, setShowAddProjectName] = useState(false);

	const addProject = () => {
		if (newProjectName.trim() === "") return;

		setProjects((currentProjects) => [
			...currentProjects,
			{
				id: currentProjects.length + 1,
				name: newProjectName,
				tasks: { title: "", status: "" },
			},
		]);

		setNewProjectName("");
		setShowAddProjectName(false);
	};

	return (
		<div>
			<Link href="/">Home</Link>
			<h1>All Projects</h1>
			<ul>
				{projects.map((project) => (
					<li key={project.id}>
						<Link href={`/projects/${project.id}`}>{project.name}</Link>
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
					<button onClick={addProject}>Add</button>
				</>
			)}
		</div>
	);
};

export default Projects;
