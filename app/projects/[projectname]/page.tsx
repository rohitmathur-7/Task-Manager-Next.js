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

	const { projects, addTask, deleteTask, deleteProject, updateProject } =
		useProjects();

	const currentProject = projects.find(
		(project) =>
			String(project.name.toLowerCase().replaceAll(" ", "-")) ===
			String(projectName),
	);

	const [projectTitle, setProjectTitle] = useState(currentProject?.name);

	const [taskName, setTaskName] = useState("");
	const [taskStatus, setTaskStatus] = useState("");
	const [isEditingProjectName, setIsEditingProjectName] = useState(false);

	const [showAddTaskName, setShowAddTaskName] = useState(false);

	const projectNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditingProjectName && projectNameRef.current) {
			projectNameRef.current.focus();
		}
	}, [isEditingProjectName]);

	useEffect(() => {
		setProjectTitle(currentProject?.name);
	}, [projects]);

	const handleDeleteProject = () => {
		deleteProject(currentProject?.id ?? "");
		redirect("/");
	};

	const addNewTask = () => {
		setShowAddTaskName(true);
	}

	const addNewTaskk = () => {
		addTask(currentProject?.id ?? "", {
			title: taskName,
			status: taskStatus,
		})

		setTaskName("");
		setTaskStatus("");
		setShowAddTaskName(false);
	}

	return (
		<div>
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
					<b>{projectTitle ? projectTitle : ""}</b>
				</h2>
			)}

			<br />
			{showAddTaskName && 
				<>
					<input
						type="text"
						placeholder="Task Name"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
					<select
						value={taskStatus}
						onChange={(e) => {
							setTaskStatus(e.target.value);
						}}
					>
						<option value="">Select Status</option>
						<option value="not-started">Not Started</option>
						<option value="in-progress">In Progress</option>
						<option value="done">Done</option>
					</select>
					<button className="ml-8 text-green-700 cursor-pointer" onClick={addNewTaskk}>Add</button>
				</>
			}
			<ul className="bg-blue-700 p-4 rounded-lg mt-4">
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
							<button
								className="ml-4 text-red-700"
								onClick={() => deleteTask(currentProject?.id ?? "", task.id)}
							>
								Delete Task
							</button>
						</li>
					))}
			</ul>
			<button
				className="ml-128 cursor-pointer block"
				onClick={addNewTask}
			>
				Add New Task
			</button>
			<button className="mt-4 text-red-700" onClick={handleDeleteProject}>Delete Project</button>
		</div>
	);
};

export default Project;
