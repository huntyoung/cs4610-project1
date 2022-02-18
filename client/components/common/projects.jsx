import { useContext, useState } from "react/cjs/react.production.min"
import { ApiContext } from "../../utils/api_context";

export const projects = () => {
  const api = useContext(ApiContext);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const save = () => {
    setErrorMessage('');

    if (title === '') {
      setErrorMessage('Title cannot be empty');
      return;
    }
    
    const project = {
      'name': name,
      'userId': userId,
    };

    const { project } = await api.post('/projects', project);
  }

  
}