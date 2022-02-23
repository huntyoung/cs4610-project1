import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../utils/api_context";
import { Button } from "../common/button";

export const Task = ({ projectId, tasks, leader }) => {
  const api = useContext(ApiContext);

  const [userId, setUserId] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUserId(res.user.id);
  }, []);

  const takeTask = async (taskId) => {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}/${userId}`);
    console.log(response.response);
  }

  const completeTask = async (id) => {
    const complete = await api.put(`/projects/${projectId}/tasks/${id}`);
  };

  return (
    tasks.map((task) => (
      <div key={task.id}>
        {task.completed ? (
          <s>
            {task.userId === userId ? (<input type="checkbox" onClick={() => completeTask(task.id)} defaultChecked={task.completed ? true : false}/>) : (<div></div>)}
            <span>Task: {task.title}</span>
            <div>Description: {task.description}</div>
            <div>Assigned to {task.userId}: I am {userId}</div>
            <div>Time Estimation: {task.timeEstimation} hour(s)</div>
            <Button children="Take task" onClick={() => takeTask(task.id)}/>
            <br></br>
          </s>
        ) : (
          <div>
            {task.userId === userId ? (<input type="checkbox" onClick={() => completeTask(task.id)} defaultChecked={task.completed ? true : false}/>) : (<div></div>)}
            <span>Task: {task.title}</span>
            <div>Description: {task.description}</div>
            <div>Assigned to {task.userId}: I am {userId}</div>
            <div>Time Estimation: {task.timeEstimation} hour(s)</div>
            <Button children="Take task" onClick={() => takeTask(task.id)}/>
            <br></br>
          </div>
        )}
      </div>
    ))
  );
};
