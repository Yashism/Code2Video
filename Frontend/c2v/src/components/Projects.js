
import React, { useState } from "react";

const MyComponent = () => {
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);

  const handleCreateProject = () => {
    const newProjectName = prompt('Enter the name of the project:');
    if (newProjectName) {
      setProjects((prevProjects) => [
        ...prevProjects,
        { name: newProjectName, isEditing: false, style: { backgroundColor: 'black', color: 'white' } },
      ]);
    }
  };

  const handleDeleteProject = (projectIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(projectIndex, 1);
      return updatedProjects;
    });
  };

  const handleEditProject = (projectIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[projectIndex].isEditing = true;
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
      <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateProject}>
        + Create Project
      </button>
      {projects.length > 0 ? (
        <ul className="mt-4">
          {projects.map((project, index) => (
            <li key={index} className="flex items-center mb-2">
              {project.isEditing ? (
                <>
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
                  />
                  <button className="text-green-500 font-semibold" onClick={() => handleSaveProject(index)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div style={project.style} className="text-box p-2 rounded">
                    {project.name}
                  </div>
                  <button className="text-red-500 font-semibold" onClick={() => handleDeleteProject(index)}>
                    Delete
                  </button>
                  <button className="text-blue-500 font-semibold" onClick={() => handleEditProject(index)}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default MyComponent;


















