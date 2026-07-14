"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Task = {
  id: string;
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
  deleteTask: (projectId: string, taskId: string) => void;
  updateTask: (
    projectId: string,
    taskId: string,
    task: Omit<Task, "id">,
  ) => void;
  deleteProject: (projectID: string) => void;
  updateProject: (projectID: string, projectName: string) => void;
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
    setProjects((currentProjects) => {
      return currentProjects.map((project) => {
        if (project.id === projectId) {
          const currentTasks = Array.isArray(project.tasks)
            ? project.tasks
            : [];

          return {
            ...project,
            tasks: [
              ...currentTasks,
              { ...task, id: (currentTasks.length + 1).toString() },
            ],
          };
        }

        return project;
      });
    });
  };

  const deleteTask = (projectID: string, taskId: string) => {
    setProjects((currentProjects) => {
      return currentProjects.map((project) => {
        if (project.id === projectID) {
          return {
            ...project,
            tasks: project.tasks?.filter((task) => task.id !== taskId),
          };
        }

        return project;
      });
    });
  };

  const updateTask = (
    projectId: string,
    taskId: string,
    task: Omit<Task, "id">,
  ) => {
    setProjects((currentProjects) => {
      return currentProjects.map((project) => {
        if (project.id === projectId) {
          if (Array.isArray(project.tasks)) {
            return {
              ...project,
              tasks: project.tasks.map((t) =>
                t.id === taskId ? { ...t, ...task } : t,
              ),
            };
          }
        }

        return project;
      });
    });
  };

  const deleteProject = (projectId: string) => {
    setProjects((currentProjects) => {
      return currentProjects.filter((project) => project.id !== projectId);
    });
  };

  const updateProject = (projectID: string, projectName: string) => {
    setProjects((currentProjects) => {
      return currentProjects.map((project) => {
        if (project.id === projectID) {
          return {
            ...project,
            name: projectName,
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
        deleteTask,
        updateTask,
        deleteProject,
        updateProject,
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
