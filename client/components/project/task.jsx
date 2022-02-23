import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../utils/api_context";

export const Task = ({ projectId, tasks, leader }) => {

  const api = useContext(ApiContext);

  const [userId, setUserId] = useState(null);

  useEffect(async() => {
    const res = await api.get('/users/me')
    setUserId(res.user.id);
  }, [])

  const completeTask = async (id) => {
    const complete = await api.put(`/projects/${projectId}/tasks/${id}`);
  }

  console.log(userId);

  return (
    tasks.map((task) => (
      <div>
        <div>Task: {task.title}</div>
        <div>Assigned to {task.userId}: I am {userId}</div>
        {task.userId === userId ? 
          <input type="checkbox" onClick={() => completeTask(task.id)}/>
        : <div></div>}
      </div>
    ))
  );
}