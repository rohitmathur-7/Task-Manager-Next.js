import Link from "next/link";
import tasks from "../../data/tasks";

const Project = async ({
	params,
}: {
	params: Promise<{ projectid: string }>;
}) => {
	const { projectid } = await params;

	return (
		<div>
			<Link href="/">Home</Link>
			<ul>
				{tasks
					.filter((task) => task.projectId === projectid)
					.map((task) => (
						<li key={task.id}>{task.title}</li>
					))}
			</ul>
		</div>
	);
};

export default Project;
