/*

const resultData = [];
const RENDER_RESULT = "add-new-project";

const inputProject = document.getElementById("input-project");
const inputProjectName = document.getElementById("name-project");
const inputStartDate = document.getElementById("start-date");
const inputEndDate = document.getElementById("end-date");
const inputProjectDesc = document.getElementById("description-project");
const inputNodeJS = document.getElementById("node-js");
const inputNextJS = document.getElementById("next-js");
const inputReactJS = document.getElementById("react-js");
const inputJavascript = document.getElementById("javascript");
const inputUploadImage = document.getElementById("upload-image");
*/
const generateID = () => {
  return +new Date();
};

const addProject = () => {
  const projectName = inputProjectName.value;
  const startDate = inputStartDate.value;
  const endDate = inputEndDate.value;
  const projectDesc = inputProjectDesc.value;
  const checkNodeJS = inputNodeJS.checked;
  const checkReactJS = inputReactJS.checked;
  const checkNextJS = inputNextJS.checked;
  const checkJavascript = inputJavascript.checked;

  const uploadImage = URL.createObjectURL(inputUploadImage.files[0]);

  const project = {
    projectName,
    startDate,
    endDate,
    projectDesc,
    checkNodeJS,
    checkReactJS,
    checkNextJS,
    checkJavascript,
    uploadImage,
  };

  resultData.push(project);
  document.dispatchEvent(new Event(RENDER_RESULT));
};

const createProjectItem = (resultData) => {
  const {
    projectName,
    startDate,
    endDate,
    projectDesc,
    checkNodeJS,
    checkReactJS,
    checkNextJS,
    checkJavascript,
    uploadImage,
  } = resultData;

  const projectSection = document.createElement("section");
  projectSection.classList.add("project-item");
  projectSection.innerHTML = `
    <img src=${uploadImage} alt="">
    <div class="project-name">
        <h3>${projectName}</h3>
        <div class="project-duration">

        <p>Created: ${getConversionDate(startDate)}</p>
            <p>Duration: ${getDuration(startDate, endDate)}</p>

        
        </div>
    </div>
    <div class="project-description">
        <h3>Project Description</h3>
        <p>
            ${projectDesc}
        </p>
    </div>
   
    `;

  const projectTech = document.createElement("div");
  projectTech.classList.add("project-tech-info");

  if (checkNodeJS) {
    const nodeJS = document.createElement("i");
    nodeJS.className = "fa-brands fa-node-js";
    projectTech.append(nodeJS);
  }

  if (checkReactJS) {
    const reactJS = document.createElement("i");
    reactJS.className = "fa-brands fa-react";
    projectTech.append(reactJS);
  }

  if (checkNextJS) {
    const nextJS = document.createElement("i");
    nextJS.className = "fa-brands fa-vuejs";
    projectTech.append(nextJS);
  }

  if (checkJavascript) {
    const javascript = document.createElement("i");
    javascript.className = "fa-brands fa-square-js";
    projectTech.append(javascript);
  }

  const actionBtn = document.createElement("div");
  actionBtn.classList.add("action-btn");

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "edit-list");
  editBtn.innerText = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "delete-list");
  deleteBtn.innerText = "delete";

  actionBtn.append(editBtn, deleteBtn);

  projectSection.append(projectTech, actionBtn);

  return projectSection;
};

// add duration time

const findProjectIndex = (projectId) => {
  for (const project of resultData) {
    if (project.id === projectId) {
      return project;
    }
  }
  return null;
};

const deleteProject = (id) => {
  const projectTarget = findProjectIndex(id);

  if (projectTarget === -1) {
    return;
  }

  if (confirm("do you want to delete this project?") === true) {
    resultData.splice(projectTarget, 1);
    document.dispatchEvent(new Event(RENDER_RESULT));
  }
};

const getDuration = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffDate = Math.abs(date2 - date1);
  const projectDuration = Math.floor(diffDate / (1000 * 3600 * 24));

  let calculateDuration = "";
  let durationTotal = "";

  if (projectDuration > 30) {
    calculateDuration = Math.round(projectDuration / 30);
    durationTotal = `${calculateDuration} month(s)`;
  } else {
    durationTotal = `${projectDuration} day(s)`;
  }
  return durationTotal;
};

const getConversionDate = (startDate) => {
  const dateCreation = new Date(startDate);

  let createdDate = dateCreation.getDate();
  let createdMonth = dateCreation.getMonth();
  let createdYear = dateCreation.getFullYear();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < month.length; i++) {
    if (createdMonth === i) {
      createdMonth = month[i];
    }
  }

  return `${createdDate} ${createdMonth} ${createdYear}`;
};
