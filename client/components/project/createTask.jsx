import { useState, useContext } from 'react';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { ApiContext } from '../../utils/api_context';

export const CreateTask = ({ addToList, projectId }) => {
  const api = useContext(ApiContext);
  const [taskName, setTaskName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);

  const saveProject = async () => {
    setErrorMessage('');

    if (taskName === '') {
      setErrorMessage("Task name can't be empty");
      return;
    } 
    if (time < 1) {
      setErrorMessage("Time estimation can't be 0 or less");
      return;
    }
    if (description === '') {
      setErrorMessage("Description cannot be empty");
      return;
    }
    else {
      const taskPostBody = {
        name: taskName,
        description: description,
        time_estimation : time
      };
      console.log(projectId);
      const { task } = await api.post(`/projects/${projectId}/tasks`, taskPostBody);

      console.log(task);

      addToList(task);
    }
  };

  return (
    <div className="w-1/3">
      <Paper>
        <h2 className="font-bold text-2xl">Create Task</h2>
        <label htmlFor="task">Task Name</label>
        <Input name="task" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <label htmlFor="estimation">Time Estimation (in hours)</label>
        <Input name="estimation" placeholder="Time To Complete" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        <label htmlFor="description">Task Description</label>
        <Input name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <Button onClick={saveProject}>Create Task</Button>
        <div className="text-red-600">{errorMessage}</div>
      </Paper>
    </div>
  );
};