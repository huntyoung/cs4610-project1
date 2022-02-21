import { useState } from 'react';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const CreateProject = ({ saveProject }) => {
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const buttonClicked = async () => {
    if (projectName === '') {
      setErrorMessage("Project name can't be empty");
      return;
    } else saveProject(projectName);
  };

  return (
    <div>
      <Paper>
        <h2>Create Project</h2>
        <div>Project Name</div>
        <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <Button onClick={buttonClicked}>Create Project</Button>
        <div className="text-red-600">{errorMessage}</div>
      </Paper>
    </div>
  );
};
