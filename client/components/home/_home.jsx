import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Projects } from './projects';
import { CreateProject } from './create_project';
import { Paper } from '../common/paper';
import { Input } from '../common/input';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    const res = await api.get('/users/me');
    const proj = await api.get('/projects');
    setProjects(proj.projects);
    setUser(res.user);
    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const saveProject = async (projectName) => {
    const projectBody = {
      name: projectName,
    };
    const { project } = await api.post('/projects', projectBody);

    setProjects([...projects, project]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1>Welcome {user.firstName}</h1>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
        {roles.includes('admin') && (
          <Button type="button" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        )}
      </div>
      <CreateProject saveProject={saveProject} />
      <Projects projects={projects} />
    </>
  );
};
