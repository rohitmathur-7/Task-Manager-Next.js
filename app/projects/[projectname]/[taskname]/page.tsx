"use client";

import { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";
import { useParams } from "next/navigation";

const Task = () => {
  const { projects, updateTask } = useProjects();

  const params = useParams<{
    projectname: string | string[];
    taskname: string | string[];
  }>();

  const projectName = Array.isArray(params.projectname)
    ? params.projectname[0]
    : params.projectname;

  const taskName = Array.isArray(params.taskname)
    ? params.taskname[0]
    : params.taskname;

  const currentProject = projects.find(
    (project) =>
      String(project.name.toLowerCase().replaceAll(" ", "-")) ===
      String(projectName),
  );

  const currentTask = currentProject?.tasks?.find(
    (task) =>
      String(task.title.toLowerCase().replaceAll(" ", "-")) ===
      String(taskName),
  );

  const [isEditingTaskTitle, setIsEditingTaskTitle] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(currentTask?.title || "");

  const editTaskTitle = () => {
    setIsEditingTaskTitle(true);
  };

  return (
    <>
      <h1>Task Details:</h1>
      {!isEditingTaskTitle ? (
        <h2 className="cursor-pointer" onClick={editTaskTitle}>
          {newTaskTitle}
        </h2>
      ) : (
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onBlur={() => {
            if (currentProject && currentTask) {
              updateTask(currentProject.id, currentTask.id, {
                status: currentTask.status,
                title: newTaskTitle,
              });
            }
            setIsEditingTaskTitle(false);
          }}
        />
      )}

      <h2>{currentTask?.status}</h2>
    </>
  );
};

export default Task;
