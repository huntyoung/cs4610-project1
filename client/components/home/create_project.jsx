import { useState, useContext } from 'react';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { ApiContext } from '../../utils/api_context';

export const CreateProject = ({ addToList }) => {
  const api = useContext(ApiContext);
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const saveProject = async () => {
    if (projectName === '') {
      setErrorMessage("Project name can't be empty");
      return;
    } else {
      const projectBody = {
        name: projectName,
      };
      const { project } = await api.post('/projects', projectBody);

      addToList(project);
    }
  };

  return (
    <div className="w-1/3">
      <Paper>
        <h2 className="font-bold text-2xl">Create Project</h2>
        <Input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <Button onClick={saveProject}>Create Project</Button>
        <div className="text-red-600">{errorMessage}</div>
      </Paper>
    </div>
  );
};
