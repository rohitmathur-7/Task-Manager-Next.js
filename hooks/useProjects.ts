import { useEffect, useState } from "react";

type ProjectTask = {
	title: string;
	status: string;
};

export type Project = {
	id: number;
	name: string;
	tasks: ProjectTask;
};

const useProjects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const storedProjects = localStorage.getItem("projects");

		if (storedProjects) {
			setProjects(JSON.parse(storedProjects));
		} else {
			setProjects([]);
		}

		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated) return;

		localStorage.setItem("projects", JSON.stringify(projects));
	}, [isHydrated, projects]);

	return { projects, setProjects };
};

export default useProjects;
