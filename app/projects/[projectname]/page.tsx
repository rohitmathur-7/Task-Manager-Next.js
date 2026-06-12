"use client";

import Link from "next/link";
import { useProjects } from "@/context/ProjectsContext";
import { useState, useRef, useEffect } from "react";
import { useParams, redirect } from "next/navigation";

const Project = () => {
	const params = useParams<{ projectname: string | string[] }>();
	const projectName = Array.isArray(params.projectname)
		? params.projectname[0]
		: params.projectname;

	const { projects, addTask, deleteProject, updateProject } = useProjects();

	const currentProject = projects.find(
		(project) =>
			String(project.name.toLowerCase().replaceAll(" ", "-")) ===
			String(projectName),
	);

	const [projectTitle, setProjectTitle] = useState(
		currentProject?.name ?? projectName?.replaceAll("-", " "),
	);

	const [taskName, setTaskName] = useState("");
	const [taskStatus, setTaskStatus] = useState("");
	const [isEditingProjectName, setIsEditingProjectName] = useState(false);

	const projectNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditingProjectName && projectNameRef.current) {
			projectNameRef.current.focus();
		}
	}, [isEditingProjectName]);

	const handleDeleteProject = () => {
		deleteProject(currentProject?.id ?? "");
		redirect("/");
	};

	return (
		<div>
			<Link href="/">Home</Link>
			<br />
			{isEditingProjectName ? (
				<input
					type="text"
					value={projectTitle}
					onChange={(e) => {
						setProjectTitle(e.target.value);
					}}
					onBlur={(e) => {
						updateProject(currentProject?.id ?? "", e.target.value);
						setIsEditingProjectName(false);
						redirect(
							`/projects/${e.target.value.toLowerCase().replaceAll(" ", "-")}`,
						);
					}}
					ref={projectNameRef}
				/>
			) : (
				<h2
					onClick={() => {
						projectNameRef?.current?.focus();
						setIsEditingProjectName(true);
					}}
				>
					{projectTitle ? projectTitle : ""}
				</h2>
			)}

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
				onChange={(e) => {
					const index = e.target.selectedIndex;
					const optionName = e.target.options[index].text;
					setTaskStatus(optionName);
				}}
			>
				<option value="">Select Status</option>
				<option value="not-started">Not Started</option>
				<option value="in-progress">In Progress</option>
				<option value="done">Done</option>
			</select>
			<button
				onClick={() =>
					addTask(currentProject?.id ?? "", {
						title: taskName,
						status: taskStatus,
					})
				}
			>
				Add
			</button>
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
							<Link
								href={`/projects/${projectName}/${task.title.toLowerCase().replaceAll(" ", "-")}`}
							>
								{task.title} - {task.status}
							</Link>
						</li>
					))}
			</ul>
			<button onClick={handleDeleteProject}>Delete Project</button>
		</div>
	);
};

export default Project;
