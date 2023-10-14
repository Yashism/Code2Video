import React , {useState} from "react";


const Projects = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">User Projects</h1>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Render user projects here */}
        </ul>
      </div>
    </div>
  );
};

export default Projects;

const MyComponent = () => {
  const [projects, setProjects] = React.useState([]);

  // Function to create a new project
  const createProject = () => {
    // Logic to create a new project
    const newProject = {
      id: projects.length + 1,
      name: "New Project"
    };

    setProjects([...projects, newProject]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">User Projects</h1>
        
        {/* Render user projects here */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold">{project.name}</h2>
              {/* Additional project details */}
            </li>
          ))}
        </ul>
        
        <div className="mt-8 flex items-center justify-center">
          {/* Create project button */}
          <button
            className="bg-white p-4 rounded-full shadow-lg"
            onClick={createProject}
          >
            <span className="text-4xl text-gray-400">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

//just testing


















// import React, { useState } from 'react';

// const Projects = () => {
//   const [projectCount, setProjectCount] = useState(0);

//   // Replace this mock data with your actual data source
//   const userProjects = []; // Example: Fetch user projects and store them in this array

//   // Update the project count based on the actual number of user projects
//   useEffect(() => {
//     setProjectCount(userProjects.length);
//   }, [userProjects]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold mb-8">User Projects</h1>

//         {projectCount > 0 ? (
//           <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {/* Render user projects here */}
//             </ul>
//             ) : (
//               <div>
//                 <p>You have no projects.</p>
//                 <button className="bg-blue-500 text-white px-4 py-2 mt-4">
//                   Create Project
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     };

//     export default Projects;
