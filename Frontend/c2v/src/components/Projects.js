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
      navigate("/login");
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
    <>
      <div className="wrapper" style={{ marginTop: "250px" }} >
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
                          }}
                          className="w-full p-2 rounded border mr-2"
                        />
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
                          onClick={() => navigate("/create")}
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
                          }}
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
              <p className="text-xl font-bold larger-bold-text">
                No projects found.
              </p>
            )}
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flip-card__btn create_project_btn"
                onClick={handleCreateProject}
              >
                Create Project
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
      </div>
    </>
  );
};

export default MyComponent;

// const MyComponent = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const user = firebase.auth().currentUser;
//         const projectsRef = firebase.firestore().collection("projects");
//         const snapshot = await projectsRef
//           .where("userId", "==", user.uid)
//           .get();

//         const fetchedProjects = snapshot.docs.map((doc) => doc.data());
//         setProjects(fetchedProjects);
//       } catch (error) {
//         console.error("Failed to fetch projects: ", error.message);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleCreateProject = async () => {
//     try {
//       const user = firebase.auth().currentUser;
//       const projectsRef = firebase.firestore().collection("projects");
//       const newProjectRef = await projectsRef.add({
//         userId: user.uid,
//         name: "",
//         isEditing: true,
//         style: { backgroundColor: "black", color: "white" },
//       });

//       const newProject = {
//         id: newProjectRef.id,
//         userId: user.uid,
//         name: "",
//         isEditing: true,
//         style: { backgroundColor: "black", color: "white" },
//       };

//       setProjects((prevProjects) => [...prevProjects, newProject]);
//     } catch (error) {
//       console.error("Failed to create new project: ", error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Failed to log out: ", error.message);
//     }
//   };

//   const handleDeleteProject = async (projectId) => {
//     try {
//       await firebase.firestore().collection("projects").doc(projectId).delete();
//       setProjects((prevProjects) =>
//         prevProjects.filter((project) => project.id !== projectId)
//       );
//     } catch (error) {
//       console.error("Failed to delete project: ", error.message);
//     }
//   };

//   const handleSaveProject = async (projectId, newName) => {
//     try {
//       await firebase
//         .firestore()
//         .collection("projects")
//         .doc(projectId)
//         .update({ name: newName, isEditing: false });

//       setProjects((prevProjects) =>
//         prevProjects.map((project) => {
//           if (project.id === projectId) {
//             return { ...project, name: newName, isEditing: false };
//           }
//           return project;
//         })
//       );
//     } catch (error) {
//       console.error("Failed to save project: ", error.message);
//     }
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="flip-card__inner">
//           <div className="flip-card__front project_card">
//             <h1 className="text-3xl font-bold mb-4 title">User Projects</h1>

//             {projects.length > 0 ? (
//               <ul className="mt-4 projects-list">
//                 {projects.map((project) => (
//                   <li key={project.id} className="flex items-center mb-2">
//                     {project.isEditing ? (
//                       <div className="flex-grow flex items-center w-full">
//                         <input
//                           type="text"
//                           value={project.name}
//                           onChange={(e) =>
//                             handleSaveProject(project.id, e.target.value)
//                           }
//                           className="w-full p-2 rounded border mr-2"
//                         />
//                         <button
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
//                           onClick={() => handleSaveProject(project.id, project.name)}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
//                           onClick={() => handleDeleteProject(project.id)}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex-grow flex items-center w-full">
//                         <div
//                           //style={project.style}
//                           className="text-box p-2 rounded flex-grow cursor-pointer"
//                           onClick={() => navigate("/create")}
//                         >
//                           {`${index + 1}) ${project.name}`}
//                         </div>
//                         <button
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
//                           onClick={() => handleSaveProject(project.id, project.name)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
//                           onClick={() => handleDeleteProject(project.id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-xl font-bold larger-bold-text">
//                 No projects found.
//               </p>
//             )}

//             <div className="mb-4">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flip-card__btn create_project_btn"
//                 onClick={handleCreateProject}
//               >
//                 Create Project
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="logout_btn">
//         <button
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flip-card__btn"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </>
//   );
// };