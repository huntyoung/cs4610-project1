import { useContext, useState } from "react";
import { ApiContext } from "../../utils/api_context";

export const Task = ({ projectId, tasks, userId, leader }) => {

  const api = useContext(ApiContext);

  const [user, setUser] = useState(null);

  const completeTask = async (id) => {
    const complete = await api.put(`/projects/${projectId}/tasks/${id}`);
  }

  console.log(tasks);

  return (
    tasks.map((task) => {
      <div>
        <div>Task: {task.title}</div>
        <div>Assigned to me</div>
        {task.userId === userId ? 
          <input type="checkbox" onClick={() => completeTask(task.id)}/>
        : <div></div>}
      </div>
    })
  );
}