import { useNavigate } from 'react-router';
import { Button } from '../common/button';

export const Projects = ({ projects, userId, deleteProject }) => {
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="flex-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className={
            project.creatorId === userId ? 'border-2 rounded p-4 bg-green-500' : 'border-2 rounded p-4 bg-red-600'
          }
        >
          <div className="block">{project.name}</div>
          <div className="inline-block">
            <Button onClick={() => redirect(project.id)}>Go to project</Button>
          </div>
          {project.creatorId === userId ? (
            <div className="inline-block ml-3">
              <Button onClick={() => deleteProject(project)}>Delete</Button>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
