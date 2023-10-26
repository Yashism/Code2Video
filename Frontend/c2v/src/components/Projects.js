import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1 className="text-3xl font-bold mb-4">User Projects</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Logout
      </button>
      {projects.length > 0 ? (
        <ul className="mt-4">
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
                    }}
                    className="w-full p-2 rounded border mr-2"
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleSaveProject(index)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                    onClick={() => handleDeleteProject(index)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex items-center w-full">
                  <div
                    style={project.style}
                    className="text-box p-2 rounded flex-grow cursor-pointer"
                    onClick={() => navigate("/Create")}
                  >
                    {project.name}
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                    onClick={() => {
                      setProjects((prevProjects) => {
                        const updatedProjects = [...prevProjects];
                        updatedProjects[index].isEditing = true;
                        return updatedProjects;
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
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
        <p>No projects found.</p>
      )}
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateProject}
        >
          + Create Project
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
