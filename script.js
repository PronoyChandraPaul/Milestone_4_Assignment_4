
// Toggle-btn

const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")


const allFilter = document.getElementById("all-filter-btn");
allFilter.addEventListener('click', function () {
currentFilter = "All"; 
  allFilterBtn.classList.add("bg-blue-600");

  interviewFilterBtn.classList.add("bg-black/50");
  interviewFilterBtn.classList.remove("bg-blue-600");

  rejectedFilterBtn.classList.add("bg-black/50");
  rejectedFilterBtn.classList.remove("bg-blue-600");


  allApplicationSection.classList.remove("hidden")
  filteredSection.classList.add("hidden")
  calculateCount()
  
});

const interviewFilter = document.getElementById("interview-filter-btn");
interviewFilter.addEventListener('click', function () {

  currentFilter = "Interview";
  interviewFilterBtn.classList.add("bg-blue-600");
  interviewFilterBtn.classList.remove("bg-black/50");

  allFilterBtn.classList.remove("bg-blue-600");
  allFilterBtn.classList.add("bg-black/50");

  rejectedFilterBtn.classList.add("bg-black/50");
  rejectedFilterBtn.classList.remove("bg-blue-600");

   allApplicationSection.classList.add("hidden")
  renderInterview()
  filteredSection.classList.remove("hidden")
  
  calculateCount()
});

const rejectedFilter = document.getElementById("rejected-filter-btn");
rejectedFilter.addEventListener('click', function () {
 currentFilter = "Rejected";
  rejectedFilterBtn.classList.add("bg-blue-600");
  rejectedFilterBtn.classList.remove("bg-black/50");

  interviewFilterBtn.classList.add("bg-black/50");
  interviewFilterBtn.classList.remove("bg-blue-600");

  allFilterBtn.classList.remove("bg-blue-600");
  allFilterBtn.classList.add("bg-black/50");

allApplicationSection.classList.add("hidden")
  renderRejected()
  filteredSection.classList.remove("hidden")

  calculateCount()
});

// Count Section 

let interviewList = [];
let rejectedList = [];
let currentFilter = "All";

let total = document.getElementById("totalCount");
let interview = document.getElementById("interviewCount");
let rejected = document.getElementById("rejectedCount");

let summary = document.getElementById("applicationSummary");

const allApplicationSection = document.getElementById("allApplications")

const mainContainer = document.querySelector("main");
function calculateCount() {
  total.innerText = allApplicationSection.children.length 
  interview.innerText = interviewList.length
  rejected.innerText = rejectedList.length 

const totalCount = allApplicationSection.children.length
  const interviewCount = interviewList.length
  const rejectedCount = rejectedList.length
  


  total.innerText = totalCount
  interview.innerText = interviewCount
  rejected.innerText = rejectedCount

  if (currentFilter === "All") {
    summary.innerText = totalCount
  }

 else if (currentFilter === "Interview") {
  summary.innerText = `${interviewCount} of ${totalCount}`
}
 else if (currentFilter === "Rejected") {
    summary.innerText = `${rejectedCount} of ${totalCount}`
  }

} 
calculateCount()



mainContainer.addEventListener("click", function (event) {
 
if (event.target.classList.contains("interview-btn")) {

  const parentNode = event.target.closest(".shadow-xl");
  const jobTitle = parentNode.querySelector(".jobTitle").innerText;

  const jobType = parentNode.querySelector(".jobType").innerText;
  const workType = parentNode.querySelector(".workType").innerText;
  const jobDescription = parentNode.querySelector(".jobDescription").innerText;

  rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);

  const exists = interviewList.find(item => item.jobTitle === jobTitle);

  if (!exists) {
    interviewList.push({
      jobTitle,
      jobType,
      workType,
      status: "Applied",
      jobDescription
    });
  }

  parentNode.querySelector(".status").innerText = "Applied";

  if (currentFilter !== "All") {
    renderInterview();
  }

  calculateCount();
}

 else if (event.target.classList.contains("rejected-btn")) {

  const parentNode = event.target.closest(".shadow-xl");
  const jobTitle = parentNode.querySelector(".jobTitle").innerText;

  const jobType = parentNode.querySelector(".jobType").innerText;
  const workType = parentNode.querySelector(".workType").innerText;
  const jobDescription = parentNode.querySelector(".jobDescription").innerText;


  interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);

  const exists = rejectedList.find(item => item.jobTitle === jobTitle);

  if (!exists) {
    rejectedList.push({
      jobTitle,
      jobType,
      workType,
      status: "Rejected",
      jobDescription
    });
  }

  parentNode.querySelector(".status").innerText = "Rejected";

  if (currentFilter !== "All") {
    renderRejected();
  }

  calculateCount();
}

   else if (event.target.closest(".deleteBtn")) {

    const parentNode = event.target.closest(".shadow-xl");
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;

    if (currentFilter === "Interview") {
      interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
      renderInterview();
    }

    else if (currentFilter === "Rejected") {
      rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);
      renderRejected();
    }

    else {
      parentNode.remove();
    }

    calculateCount();
  }
})

const filterSection = document.getElementById("filteredSection");
function getEmptyMessage() {
  return `
    <div class="flex flex-col items-center justify-center py-20 opacity-60">
        <div class="text-7xl text-blue-400 mb-4">
            <i class="fa-regular fa-file-lines"></i> 
        </div>
        <h2 class="text-2xl font-bold text-white">No jobs available</h2>
        <p class="text-white mt-2">Check back soon for new job opportunities</p>
    </div>
  `;
}

function renderInterview() {

  filterSection.innerHTML = ""
  if (interviewList.length === 0) {
    filterSection.innerHTML = getEmptyMessage();
    return;
  }
  for (let render of interviewList) {
    let div = document.createElement("div");
    div.className ="flex justify-between border-3 p-8 rounded-2xl shadow-xl"
    div.innerHTML = `
    <div class="text-white space-y-6 ">
          <h1 class="jobTitle text-2xl font-bold ">${render.jobTitle}</h1>
          <p class="jobType opacity-80">${render.jobType}</p>
          <p class="workType opacity-80">${render.workType}</p>
          <p  class="status mr-170 p-2 px-2  font-bold text-black bg-blue-200 rounded-md">${render.status}</p>
          <p class="jobDescription opacity-80">${render.jobDescription}</p>
          <div class="flex gap-6">
            <button
              class="interview-btn border-2 p-2 px-4 font-bold text-green-500 border-emerald-400 transition-all duration-100 hover:scale-105 ">INTERVIEW</button>
            <button
              class="rejected-btn border-2 p-2 px-6 font-bold text-red-600 border-red-400 transition-all duration-100 hover:scale-105">REJECTED</button>
          </div>
        </div>
    `
    filterSection.appendChild(div)
  }

}


function renderRejected() {
  filterSection.innerHTML = ""
  if (rejectedList.length === 0) {
    filterSection.innerHTML = getEmptyMessage();
    return;
  }
  for (let reject of rejectedList) {
    
    let div = document.createElement("div");
    div.className ="flex justify-between border-3 p-8 rounded-2xl shadow-xl"
    div.innerHTML = `
    <div class="text-white space-y-6 ">
          <h1 class="jobTitle text-2xl font-bold ">${reject.jobTitle}</h1>
          <p class="jobType opacity-80">${reject.jobType}</p>
          <p class="workType opacity-80">${reject.workType}</p>
          <p  class="status mr-170 p-2 px-2  font-bold text-black bg-blue-200 rounded-md">${reject.status}</p>
          <p class="jobDescription opacity-80">${reject.jobDescription}</p>
          <div class="flex gap-6">
            <button
              class="interview-btn border-2 p-2 px-4 font-bold text-green-500 border-emerald-400 transition-all duration-100 hover:scale-105 ">INTERVIEW</button>
            <button
              class="rejected-btn border-2 p-2 px-6 font-bold text-red-600 border-red-400 transition-all duration-100 hover:scale-105">REJECTED</button>
          </div>
        </div>
    `
    filterSection.appendChild(div)
  }

}

