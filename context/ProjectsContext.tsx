"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type Task = {
	title: string;
	status: string;
};

type Project = {
	id: string;
	name: string;
	tasks?: Task[];
};

type ProjectsContextType = {
	projects: Project[];
	getProjectById: (projectId: string) => Project | undefined;
	addProject: (projectName: string) => void;
	addTask: (projectId: string, task: Omit<Task, "id">) => void;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
	undefined,
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const storedProjects = localStorage.getItem("projects");

		if (storedProjects) {
			setProjects(JSON.parse(storedProjects));
		}

		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated) {
			return;
		}

		localStorage.setItem("projects", JSON.stringify(projects));
	}, [projects, isHydrated]);

	const getProjectById = (projectId: string) => {
		return projects.find((project) => project.id === projectId);
	};

	const addProject = (projectName: string) => {
		setProjects((currentProjects) => [
			...currentProjects,
			{
				id: (currentProjects.length + 1).toString(),
				name: projectName,
			},
		]);
	};

	const addTask = (projectId: string, task: Omit<Task, "id">) => {
		console.log("🚀 ~ addTask ~ projectId:", projectId);
		console.log("🚀 ~ addTask ~ task:", task);
		setProjects((currentProjects) => {
			return currentProjects.map((project) => {
				if (project.id === projectId) {
					const currentTasks = Array.isArray(project.tasks)
						? project.tasks
						: [];

					return {
						...project,
						tasks: [...currentTasks, { ...task }],
					};
				}

				return project;
			});
		});
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				getProjectById,
				addProject,
				addTask,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
}

export function useProjects() {
	const context = useContext(ProjectsContext);

	if (!context) {
		throw new Error("useProjects must be used within a ProjectsProvider");
	}

	return context;
}
