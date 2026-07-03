"use client";

import Link from "next/link";
import { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";

const Projects = () => {
	const { projects, addProject } = useProjects();
	const [newProjectName, setNewProjectName] = useState("");
	const [showAddProjectName, setShowAddProjectName] = useState(false);

	const addNewProject = (projectName: string) => {
		addProject(projectName);
		setNewProjectName("");
		setShowAddProjectName(false);
	}

	return (
		<div className="projects-page flex flex-col">
			<h1 className="mb-4"><b>All Projects</b></h1>
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

			<button className="cursor-pointer" onClick={() => setShowAddProjectName(true)}>Add Project</button>
			{showAddProjectName && (
				<>
					<input
						type="text"
						placeholder="Project Name"
						value={newProjectName}
						onChange={(e) => setNewProjectName(e.target.value)}
					/>
					<button onClick={() => addNewProject(newProjectName)} className="w-fit">Add</button>
				</>
			)}
		</div>
	);
};

export default Projects;
