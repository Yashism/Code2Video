import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Projects.css" 

const MyComponent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleCreateProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        name: "",
        isEditing: true,
        style: { backgroundColor: "black", color: "white" },
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.error("Failed to log out: ", error.message);
    }
  };

  const handleDeleteProject = (projectIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(projectIndex, 1);
      return updatedProjects;
    });
  };

  const handleSaveProject = (projectIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[projectIndex].isEditing = false;
      return updatedProjects;
    });
  };

  return (
    <><div className="wrapper">
      <div className="flip-card__inner">
        <div className="flip-card__front project_card">
          <h1 className="text-3xl font-bold mb-4 title">User Projects</h1>


          {projects.length > 0 ? (
            <ul className="mt-4 projects-list">
              {projects.map((project, index) => (
                <li key={index} className="flex items-center mb-2">
                  {project.isEditing ? (
                    <div className="flex-grow flex items-center w-full">
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setProjects((prevProjects) => {
                            const updatedProjects = [...prevProjects];
                            updatedProjects[index].name = newName;
                            return updatedProjects;
                          });
                        } }
                        className="w-full p-2 rounded border mr-2" />
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
                        onClick={() => handleSaveProject(index)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
                        onClick={() => handleDeleteProject(index)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex-grow flex items-center w-full">
                      <div
                        //style={project.style}
                        className="text-box p-2 rounded flex-grow cursor-pointer"
                        onClick={() => navigate("/Create")}
                      >
                        {`${index + 1}) ${project.name}`}
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
                        onClick={() => {
                          setProjects((prevProjects) => {
                            const updatedProjects = [...prevProjects];
                            updatedProjects[index].isEditing = true;
                            return updatedProjects;
                          });
                        } }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
                        onClick={() => handleDeleteProject(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl font-bold larger-bold-text">No projects found.</p>
          )}
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flip-card__btn create_project_btn"
              onClick={handleCreateProject}
            > Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="logout_btn">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div></>     
  );
};

export default MyComponent;
