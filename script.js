let totalCards = document.getElementById("total-cards");
let total = document.getElementById("total");

/* Buttons */
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");
/* ------------------------------------------------------------- */
console.log("WORKING JS");

function calculateCards() {
  total.innerText = totalCards.children.length;
}
calculateCards();

function toggleStyle(id) {
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
}
