import { useNavigate } from "react-router";
import { useContext, useState } from "react/cjs/react.production.min"
import { ApiContext } from "../../utils/api_context";
import { Button } from '../common/button';

export const Projects = ({ projects }) => {

  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/projects/${id}`);
  }

  return (
    <div className="flex-1">
      {projects.map((project) => (
        <div key={project.id} className="border-2 rounded p-4">
          {project.name}
          <div>
            <Button onClick={() => redirect(project.id)}>Go to project</Button>
          </div>
        </div>
      ))}
    </div>
  );
};