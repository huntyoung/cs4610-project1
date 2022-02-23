import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';
import { Input } from '../common/input';

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const api = useContext(ApiContext);

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  return (
    <>
      <div>
        <div>{projectId}</div>
        <Input placeholder="Add User by Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={addUser}>Add User</Button>
        <div className="text-red-600">{errorMessage}</div>
        <div className="text-green-600">{successMessage}</div>
      </div>
    </>
  );
};
