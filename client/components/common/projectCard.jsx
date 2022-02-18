import { Navigate, useNavigate } from "react-router";

export const projectCard = ({title, id}) => {

  const navigate = useNavigate();

  const goToProject = () => {
    navigate(`/project/${id}`);
  }

  return (
    <div className="p-4" onclick={goToProject}>
      {title}
    </div>
  );
};