import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { CreateTask } from './createTask';
import { Task } from './task';

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const api = useContext(ApiContext);

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [project, setProject] = useState(null);
  const [userId, setUserId] = useState('');
  const [projCreator, setProjCreator] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const project = await api.get(`/projects/${projectId}`);
    const tasks = await api.get(`projects/${projectId}/tasks`);
    setTasks(tasks.tasks);
    setProjCreator(project.project.creatorId);
    setProject(project.project);
    console.log("I am " + res.user.id)
    setUserId(res.user.id);
  }, []);


  const addUser = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (email === '') return;

    const { user } = await api.get(`/users/${email}`);
    if (user !== undefined) {
      const addUserBody = {
        userId: user.id,
        projectId: projectId,
      };
      success = await api.put('/projects', addUserBody);
      if (success) {
        setSuccessMessage('User successfully added');
      } else setErrorMessage('User is already added');
    } else {
      setErrorMessage('User does not exist or is already added');
    }
  };

  const addTask = async (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <div>
        <div>{projectId}</div>
        <Input placeholder="Add User by Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={addUser}>Add User</Button>
        <div className="text-red-600">{errorMessage}</div>
        <div className="text-green-600">{successMessage}</div>
      </div>
      <CreateTask addToList={addTask} projectId={projectId} />
      <Task projectId={projectId} tasks={tasks} leader={projCreator} user={userId}/>
    </>
  );
};
