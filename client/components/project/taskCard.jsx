import { useState } from "react"
import { useContext } from "react";
import { useEffect } from "react/cjs/react.production.min";
import { ApiContext } from "../../utils/api_context";
import { Button } from "../common/button";



export const TaskCard = ({ task, userId, projectId }) => {
  
  const [completed, setCompleted] = useState(task.completed);
  const [taskUser, setTaskUser] = useState(task.userId);

  const api = useContext(ApiContext);


  const completeTask = async (id) => {
    const complete = await api.put(`/projects/${projectId}/tasks/${id}`);
    setCompleted(!completed)
  }

  const takeTask = async (taskId) => {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}/${userId}`);
    setTaskUser(userId);
  }

  return (
    <div>
        {completed ? (
          <s>
            {taskUser === userId ? (<input type="checkbox" onClick={() => completeTask(task.id)} defaultChecked={completed ? true : false}/>) : (<div></div>)}
            <span>Task: {task.title}</span>
            <div>Description: {task.description}</div>
            <div>Assigned to {taskUser}: I am {userId}</div>
            <div>Time Estimation: {task.timeEstimation} hour(s)</div>
            <Button children="Take task" onClick={() => takeTask(task.id)}/>
            <br></br>
          </s>
        ) : (
          <div>
            {taskUser === userId ? (<input type="checkbox" onClick={() => completeTask(task.id)} defaultChecked={completed ? true : false}/>) : (<div></div>)}
            <span>Task: {task.title}</span>
            <div>Description: {task.description}</div>
            <div>Assigned to {taskUser}: I am {userId}</div>
            <div>Time Estimation: {task.timeEstimation} hour(s)</div>
            <Button children="Take task" onClick={() => takeTask(task.id)}/>
            <br></br>
          </div>
        )}
      </div>
  )
}