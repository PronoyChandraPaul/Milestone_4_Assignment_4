
// Toggle-btn

const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")


const allFilter = document.getElementById("all-filter-btn");
allFilter.addEventListener('click', function () {

  allFilterBtn.classList.add("bg-blue-600");

  interviewFilterBtn.classList.add("bg-black/50");
  interviewFilterBtn.classList.remove("bg-blue-600");

  rejectedFilterBtn.classList.add("bg-black/50");
  rejectedFilterBtn.classList.remove("bg-blue-600");

});

const interviewFilter = document.getElementById("interview-filter-btn");
interviewFilter.addEventListener('click', function () {

  interviewFilterBtn.classList.add("bg-blue-600");
  interviewFilterBtn.classList.remove("bg-black/50");

  allFilterBtn.classList.remove("bg-blue-600");
  allFilterBtn.classList.add("bg-black/50");

  rejectedFilterBtn.classList.add("bg-black/50");
  rejectedFilterBtn.classList.remove("bg-blue-600");

});

const rejectedFilter = document.getElementById("rejected-filter-btn");
rejectedFilter.addEventListener('click', function () {

  rejectedFilterBtn.classList.add("bg-blue-600");
  rejectedFilterBtn.classList.add("bg-black/50");

  interviewFilterBtn.classList.add("bg-black/50");
  interviewFilterBtn.classList.remove("bg-blue-600");

  allFilterBtn.classList.remove("bg-blue-600");
  allFilterBtn.classList.add("bg-black/50");


});

// Count Section 

let interviewList = [];
let rejectedList = [];


let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allApplicationSection = document.getElementById("allApplications")

const mainContainer = document.querySelector("main");
function calculateCount() {
  total.innerText = allApplicationSection.children.length 
  interviewCount.innerText = interviewList.length
  rejectedCount.innerText = rejectedList.length 
} 
calculateCount()



