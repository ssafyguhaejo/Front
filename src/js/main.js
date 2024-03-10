function toggleClearButton() {
  let searchInput = document.getElementById("searchInput");
  let clearButton = document.getElementById("clearButton");

  if (searchInput.value.trim() !== "") {
    clearButton.style.display = "inline-block";
  } else {
    clearButton.style.display = "none";
  }
}

function clearInput() {
  let searchInput = document.getElementById("searchInput");
  let clearButton = document.getElementById("clearButton");

  searchInput.value = "";
  clearButton.style.display = "none";
}

function teamCreation() {
  console.log("클릭");
  let iframe = document.getElementById("team-creation-frame");
  iframe.src = "team/start.html";
  iframe.style.display = "block";
}
