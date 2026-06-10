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
	tasks: Task[];
};

type ProjectsContextType = {
	projects: Project[];
	setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
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

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects,
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
