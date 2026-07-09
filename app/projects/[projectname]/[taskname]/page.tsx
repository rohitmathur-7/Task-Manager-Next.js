"use client";

import { useProjects } from "@/context/ProjectsContext";

const Task = () => {
	const { projects, updateTask } = useProjects();

	return <h1>Task Page Inner</h1>;
};

export default Task;
