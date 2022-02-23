import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../utils/api_context";
import { Button } from "../common/button";
import { TaskCard } from "./taskCard";

export const Task = ({ projectId, tasks, leader }) => {
  const api = useContext(ApiContext);

  const [userId, setUserId] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUserId(res.user.id);
  }, []);

  return (
    tasks.map((task) => (
      <div key={task.id}>
        <TaskCard task={task} userId={userId} projectId={projectId}/>
      </div>
    ))
  );
};
