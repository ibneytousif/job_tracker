let totalCards = document.getElementById("total-cards");
let total = document.getElementById("total");
const mainContainer = document.querySelector("main");
const rejectedSection = document.querySelector("#rejected-section");
const interviewTotal = document.getElementById("interview-total");
const rejectedTotal = document.getElementById("rejected-total");
const fiteredSection = document.getElementById("filtered-section");
const noJob = document.getElementById("no-job");
const jobCount = document.getElementById("job-count");
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
  jobCount.innerText = `${totalCards.children.length} jobs`;
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
    jobCount.innerText = `${interviewList.length} jobs`;
    totalCards.classList.add("hidden");

    if (interviewList.length == 0) {
      noJob.classList.remove("hidden");
      fiteredSection.classList.add("hidden");

      renderNojob();
    } else {
      noJob.classList.add("hidden");

      fiteredSection.classList.remove("hidden");

      render();
    }
  } else if (id == "all-btn") {
    jobCount.innerText = `${totalCards.children.length} jobs`;
    if (totalCards.children.length == 0) {
      noJob.classList.remove("hidden");
      totalCards.classList.add("hidden");
      renderNojob();
    } else {
      fiteredSection.classList.add("hidden");
      noJob.classList.add("hidden");
      totalCards.classList.remove("hidden");
    }
  } else if (id == "rejected-btn") {
    jobCount.innerText = `${rejectedList.length} jobs`;
    if (rejectedList.length == 0) {
      noJob.classList.remove("hidden");
      totalCards.classList.add("hidden");
      fiteredSection.classList.add("hidden");
      renderNojob();
    } else {
      noJob.classList.add("hidden");
      totalCards.classList.add("hidden");
      fiteredSection.classList.remove("hidden");
      rejectRender();
    }
  }
}

mainContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("interview-button")) {
    if (currentStat === "rejected-btn") {
      console.log("INSIDE REJECTED CURSTATE");
      console.log("REJECTED_LIST IS 0", rejectedList.length);
      if (rejectedList.length == 1) {
        console.log("REJECTED_LIST IS 0");
        renderNojob();
        noJob.classList.remove("hidden");
      }
    }
    console.log("Entered INTERVIEW LIST");
    const card = e.target.parentNode.parentNode;
    const jobName = card.querySelector("#job-name").innerText;
    console.log(jobName);
    const jobTag = card.querySelector("#job-tag").innerText;
    const jobPrice = card.querySelector("#job-price").innerText;
    const jobInfo = card.querySelector("#job-info").innerText;
    const jobStatus = card.querySelector("#job-status").innerText;
    card.querySelector("#job-status").innerText = "interview";

    const information = {
      jobName,
      jobTag,
      jobPrice,
      jobInfo,
      jobStatus: "interview",
    };

    const infoExist = interviewList.find(
      (items) => items.jobName === information.jobName,
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
    if (currentStat === "interview-btn") {
      console.log("INSIDE REJECTED CURSTATE");
      console.log("REJECTED_LIST IS 0", rejectedList.length);
      if (interviewList.length == 1) {
        console.log("REJECTED_LIST IS 0");
        renderNojob();
        noJob.classList.remove("hidden");
      }
    }
    console.log("Entered Rejected LIST");
    const card = e.target.parentNode.parentNode;
    const jobName = card.querySelector("#job-name").innerText;
    console.log(jobName);
    const jobTag = card.querySelector("#job-tag").innerText;
    const jobPrice = card.querySelector("#job-price").innerText;
    const jobInfo = card.querySelector("#job-info").innerText;
    const jobStatus = card.querySelector("#job-status").innerText;
    card.querySelector("#job-status").innerText = "rejected";
    const information = {
      jobName,
      jobTag,
      jobPrice,
      jobInfo,
      jobStatus: "rejected",
    };
    let infoExist = rejectedList.find(
      (items) => items.jobName === information.jobName,
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
  } else if (e.target.classList.contains("trash-button")) {
    const card = e.target.closest(".mt-5");

    const jobName = card.querySelector("#job-name").innerText;

    interviewList = interviewList.filter((items) => items.jobName !== jobName);
    rejectedList = rejectedList.filter((items) => items.jobName !== jobName);

    card.remove();
    if (currentStat === "interview-btn") {
      console.log("INSIDE REJECTED CURSTATE");
      console.log("REJECTED_LIST IS 0", rejectedList.length);
      if (interviewList.length == 0) {
        console.log("REJECTED_LIST IS 0");
        renderNojob();
        noJob.classList.remove("hidden");
      }
    }
    if (currentStat === "rejected-btn") {
      console.log("INSIDE REJECTED CURSTATE");
      console.log("REJECTED_LIST IS 0", rejectedList.length);
      if (rejectedList.length == 0) {
        console.log("REJECTED_LIST IS 0");
        renderNojob();
        noJob.classList.remove("hidden");
      }
    }

    calculateCards();

    /* if (currentStat == "interview-btn") render(); */
    /* if (currentStat == "rejected-btn") rejectRender(); */
  }
});
console.log(rejectedList);

function render() {
  const filteredSection = document.getElementById("filtered-section");
  filteredSection.innerHTML = " ";

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
            <button class="btn btn-soft btn-success interview-button">Interview</button>
            <button class="btn btn-soft btn-error rejected-button">Rejected</button>
        </div>
    </div>
    <button class="w-10 h-10 border-[#eef4ff] border   rounded-full trash-button"><i
            class="fa-regular fa-trash-can trash-button"></i></button>

    `;
    filteredSection.appendChild(div);
  }
}

function rejectRender() {
  const filteredSection = document.getElementById("filtered-section");
  filteredSection.innerHTML = " ";

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
            <button class="btn btn-soft btn-success interview-button">Interview</button>
            <button class="btn btn-soft btn-error rejected-button">Rejected</button>
        </div>
    </div>
    <button class="w-10 h-10 border-[#eef4ff] border   rounded-full trash-button"><i
            class="fa-regular fa-trash-can trash-button"></i></button>


    `;
    filteredSection.appendChild(div);
  }
}

function renderNojob() {
  const noJob = document.getElementById("no-job");
  noJob.innerHTML = " ";

  const div = document.createElement("div");
  div.className = "mt-5 bg-[#ffffff] flex flex-col items-center py-30";
  div.innerHTML = `<img src="./jobs.png" alt="">
  <div class="">
      <p class="font-semibold text-[25px] text-[#002c5c] text-center">No jobs available</p>
      <p class="text-[#64748b] text-[18px]">Check back soon for new job opportunities</p>
  </div>`;
  noJob.appendChild(div);
}
