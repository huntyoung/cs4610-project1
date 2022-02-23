import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CreateTask } from './createTask';

export const ProjectPage = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);

  const addTask = async (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <CreateTask addToList={addTask} projectId={id} />
      <div>{id}</div>
    </>
  );
};
