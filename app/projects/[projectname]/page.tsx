"use client";

import Link from "next/link";
import { useProjects } from "@/context/ProjectsContext";
import { useState } from "react";
import { useParams } from "next/navigation";

const Project = () => {
	const params = useParams<{ projectname: string | string[] }>();
	console.log("🚀 ~ Project ~ params:", params);
	const projectName = Array.isArray(params.projectname)
		? params.projectname[0]
		: params.projectname;
	console.log("🚀 ~ Project ~ projectName:", projectName);

	const { projects, setProjects } = useProjects();
	console.log("🚀 ~ Project ~ projects:", projects);

	const [taskName, setTaskName] = useState("");
	const [taskStatus, setTaskStatus] = useState("");

	const addTask = () => {
		if (!projectName || taskName.trim() === "" || taskStatus === "") return;

		setProjects((currentProjects) =>
			currentProjects.map((project) => {
				if (
					String(project.name.toLowerCase().replaceAll(" ", "-")) !==
					String(projectName)
				) {
					return project;
				}

				const currentTasks = Array.isArray(project.tasks) ? project.tasks : [];

				return {
					...project,
					tasks: [...currentTasks, { title: taskName, status: taskStatus }],
				};
			}),
		);

		setTaskName("");
		setTaskStatus("");
	};

	return (
		<div>
			<Link href="/">Home</Link>
			<br />
			<button>Add Task</button>
			<input
				type="text"
				placeholder="Task Name"
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
			/>
			<select
				value={taskStatus}
				onChange={(e) => setTaskStatus(e.target.value)}
			>
				<option value="">Select Status</option>
				<option value="not-started">Not Started</option>
				<option value="in-progress">In Progress</option>
				<option value="done">Done</option>
			</select>
			<button onClick={addTask}>Add</button>
			<ul>
				{projects
					.filter(
						(project) =>
							String(project.name.toLowerCase().replaceAll(" ", "-")) ===
							String(projectName),
					)
					.flatMap((project) =>
						Array.isArray(project.tasks) ? project.tasks : [],
					)
					.map((task, index) => (
						<li key={index}>
							{task.title} - {task.status}
						</li>
					))}
			</ul>
		</div>
	);
};

export default Project;
