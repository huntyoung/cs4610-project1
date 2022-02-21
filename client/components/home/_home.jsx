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

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { projects } = await api.get('/projects');
    setProjects(projects);
    setUser(res.user);
    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const addToList = async (project) => {
    setProjects([...projects, project]);
  };

  const deleteProject = async (project) => {
    const { success } = await api.del(`/projects/${project.id}`);
    if (success) {
      setProjects(projects.filter((n) => n !== project));
    } else {
      // setErrorMessage('Deletion failed. Please refresh and try again.');
    }
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
      <CreateProject addToList={addToList} />
      <Projects projects={projects} userId={user.id} deleteProject={deleteProject} />
    </>
  );
};
