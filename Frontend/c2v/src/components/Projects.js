
import React, { useState } from "react";

const MyComponent = () => {
  const [projectName, setProjectName] = useState('');

  const handleClick = () => {
    const projectName = prompt('Enter the name of the project:');
    setProjectName(projectName);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Projects</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
        Create Project <span className="ml-2">&#43;</span>
      </button>
      {projectName && <p className="mt-4">New project name: {projectName}</p>}
    </div>
  );
};

export default MyComponent;

// const createProjectBtn = document.getElementById("createProjectBtn");
// const projectList = document.getElementById("projectList");

// createProjectBtn.addEventListener("click", () => {
//   const projectName = prompt("Enter the name of the project:");
//   if (projectName !== null && projectName.trim() !== "") {
//     const projectBox = document.createElement("div");
//     projectBox.className = "project-box";
//     projectBox.innerHTML = `
//       <span>${projectName}</span>
//       <div class="edit-buttons">
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//       </div>
//     `;

//     projectBox.querySelector(".edit-btn").addEventListener("click", () => {
//       const newName = prompt("Enter the new name of the project:");
//       if (newName !== null && newName.trim() !== "") {
//         projectBox.querySelector("span").textContent = newName;
//       }
//     });

//     projectBox.querySelector(".delete-btn").addEventListener("click", () => {
//       projectList.removeChild(projectBox);
//     });

//     projectList.appendChild(projectBox);
//   }
// });

// export createProjectBtn;
//export default MyComponent;















