let totalCards = document.getElementById("total-cards");
let total = document.getElementById("total");
const mainContainer = document.querySelector("main");
const rejectedSection = document.querySelector("#rejected-section");
const interviewTotal = document.getElementById("interview-total");
const rejectedTotal = document.getElementById("rejected-total");
/* list Information */

let interviewList = [];
let rejectedList = [];
let currentStat = "all";

/* Buttons */
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

/* ------------------------------------------------------------- */

console.log("WORKING JS");

function calculateCards() {
  total.innerText = totalCards.children.length;
  interviewTotal.innerText = interviewList.length;
  rejectedTotal.innerText = rejectedList.length;
}
calculateCards();

function toggleStyle(id) {
  currentStat = id;
  console.log("CLICKED", id);
  allBtn.classList.add("bg-[#ffffff]", "text-[#64748b]");
  interviewBtn.classList.add("bg-[#ffffff]", "text-[#64748b]");
  rejectedBtn.classList.add("bg-[#ffffff]", "text-[#64748b]");

  allBtn.classList.remove("bg-blue-500", "text-white");
  interviewBtn.classList.remove("bg-blue-500", "text-white");
  rejectedBtn.classList.remove("bg-blue-500", "text-white");

  const selected = document.getElementById(id);
  selected.classList.remove("bg-[#ffffff]", "text-[#64748b]");
  selected.classList.add("bg-blue-500", "text-white");

  if (id == "interview-btn") {
    totalCards.classList.add("hidden");
    render();
    fiteredSection.classList.remove("hidden");
  } else if (id == "all-btn") {
    totalCards.classList.remove("hidden");

    fiteredSection.classList.add("hidden");
  } else if (id == "rejected-btn") {
    totalCards.classList.add("hidden");
    rejectRender();
    fiteredSection.classList.remove("hidden");
  }
}

mainContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("interview-button")) {
    console.log("Entered INTERVIEW LIST");
    const card = e.target.parentNode.parentNode;
    const jobName = card.querySelector("#job-name").innerText;
    console.log(jobName);
    const jobTag = card.querySelector("#job-tag").innerText;
    const jobPrice = card.querySelector("#job-price").innerText;
    const jobInfo = card.querySelector("#job-info").innerText;
    const jobStatus = card.querySelector("#job-status").innerText;

    const information = {
      jobName,
      jobTag,
      jobPrice,
      jobInfo,
      jobStatus: "interview",
    };
    let infoExist = interviewList.find(
      (items) => items.jobname === information.jobName,
    );
    if (!infoExist) {
      interviewList.push(information);
    }
    rejectedList = rejectedList.filter(
      (items) => items.jobName != information.jobName,
    );
    calculateCards();
    if (currentStat == "rejected-btn") {
      rejectRender();
    }
  } else if (e.target.classList.contains("rejected-button")) {
    console.log("Entered Rejected LIST");
    const card = e.target.parentNode.parentNode;
    const jobName = card.querySelector("#job-name").innerText;
    console.log(jobName);
    const jobTag = card.querySelector("#job-tag").innerText;
    const jobPrice = card.querySelector("#job-price").innerText;
    const jobInfo = card.querySelector("#job-info").innerText;
    const jobStatus = card.querySelector("#job-status").innerText;
    const information = {
      jobName,
      jobTag,
      jobPrice,
      jobInfo,
      jobStatus: "rejected",
    };
    let infoExist = rejectedList.find(
      (items) => items.jobname === information.jobName,
    );
    if (!infoExist) {
      rejectedList.push(information);
    }
    interviewList = interviewList.filter(
      (items) => items.jobName != information.jobName,
    );
    calculateCards();
    if (currentStat == "interview-btn") {
      render();
    }
  }
});
console.log(rejectedList);

function render() {
  const fiteredSection = document.getElementById("filtered-section");
  fiteredSection.innerHTML = " ";

  for (let each of interviewList) {
    console.log("inside_loop", each);
    let div = document.createElement("div");
    div.className =
      "mt-5 bg-[#ffffff] rounded-md px-6 py-6 flex justify-between";

    div.innerHTML = `
    <div class="">
        <h1 id="job-name" class="font-medium text-[18px] text-[#002c5c]">${each.jobName}</h1>
        <h2 id="job-tag" class="text-[#64748b] text-[16px] mt-0.5">${each.jobTag}</h2>
        <h3 id="job-price" class="text-[#64748b] text-[14px] mt-3 mb-4">${each.jobPrice}</h3>
        <button id="job-status" class=" bg-[#eef4ff] text-[#002c5c] btn ">${each.jobStatus}</button>
        <p id="job-info" class="mt-1.5 mb-4"> ${each.jobInfo} </p>
        <div>
            <button class="btn btn-soft btn-success">Interview</button>
            <button class="btn btn-soft btn-error">Rejected</button>
        </div>
    </div>
    <button class="w-10 h-10 border-[#eef4ff] border   rounded-full"><i
            class="fa-regular fa-trash-can "></i></button>

    `;
    fiteredSection.appendChild(div);
  }
}

function rejectRender() {
  const fiteredSection = document.getElementById("filtered-section");
  fiteredSection.innerHTML = " ";

  for (let each of rejectedList) {
    console.log("inside_loop", each);
    let div = document.createElement("div");
    div.className =
      "mt-5 bg-[#ffffff] rounded-md px-6 py-6 flex justify-between";

    div.innerHTML = `
    <div class="">
        <h1 id="job-name" class="font-medium text-[18px] text-[#002c5c]">${each.jobName}</h1>
        <h2 id="job-tag" class="text-[#64748b] text-[16px] mt-0.5">${each.jobTag}</h2>
        <h3 id="job-price" class="text-[#64748b] text-[14px] mt-3 mb-4">${each.jobPrice}</h3>
        <button id="job-status" class=" bg-[#eef4ff] text-[#002c5c] btn ">${each.jobStatus}</button>
        <p id="job-info" class="mt-1.5 mb-4"> ${each.jobInfo} </p>
        <div>
            <button class="btn btn-soft btn-success">Interview</button>
            <button class="btn btn-soft btn-error">Rejected</button>
        </div>
    </div>
    <button class="w-10 h-10 border-[#eef4ff] border   rounded-full"><i
            class="fa-regular fa-trash-can "></i></button>


    `;
    fiteredSection.appendChild(div);
  }
}
