let participants = JSON.parse(localStorage.getItem("participants"));
if (participants === null) document.location.href = "participant.html";

document.getElementById("totalParticipant").textContent = participants.length + "명";
document.getElementById("teamCount").setAttribute("max", participants.length);

function createItemEl() {
  const newItem = document.createElement("div");
  newItem.classList.add("leader-item");
  newItem.innerHTML = `<input class="leader-input" value=""/>`;
  return newItem;
}

const container = document.querySelector(".container");
const leaderList = document.querySelector(".leader-list");
let teamCount = 2;
let leaderSelection = -1;
leaderList.appendChild(createItemEl());
leaderList.appendChild(createItemEl());
container.addEventListener("change", (e) => {
  // 팀 개수 값 변경
  if (e.target.name == "teamCount") {
    if (e.target.value > participants.length) e.target.value = participants.length;

    const leaderItems = document.getElementsByClassName("leader-item");
    teamCount = e.target.value;
    let count = leaderItems.length;

    if (count < e.target.value) {
      while (count++ < e.target.value) {
        leaderList.appendChild(createItemEl());
      }
    } else if (count > e.target.value) {
      while (count-- > e.target.value) {
        document.getElementsByClassName("leader-item")[count].remove();
      }
    }
  }

  // 팀장 선정 방식 변경
  if (e.target.name == "leader") {
    leaderSelection = e.target.value;
    if (leaderSelection == 2) {
      leaderList.style.display = "flex";
    } else {
      leaderList.style.display = "none";
    }
  }
});

container.addEventListener("click", (e) => {
  // 이전 버튼 클릭
  if (e.target.classList.contains("prev-btn")) {
    if (confirm("입력하신 정보는 저장되지 않습니다.\n이전 페이지로 이동하시겠습니까?"))
      document.location.href = "participant.html";
  }

  // 생성 버튼 클릭
  if (e.target.classList.contains("create-btn")) {
    if (leaderSelection == -1) return alert("팀장 선정 방식을 선택해주세요.");
    let members = [...participants];
    let teams = [];
    let teamLeader = leaderSelection > 0;
    for (let i = 1; i <= teamCount; i++) {
      let teamName = `Team ${i}`;
      let teamMembers = [];

      if (leaderSelection < 2) {
        // 팀장 없음, 랜덤 방식
        for (let j = 0; j < Math.ceil(members.length / (teamCount - i)); j++) {
          if (members.length > 0) {
            let randomIndex = Math.floor(Math.random() * members.length);
            teamMembers.push(members[randomIndex].name);
            members.splice(randomIndex, 1);
          }
        }
      } else {
        // 팀장 지정 방식
      }
      teams.push({ teamName, members: teamMembers, teamLeader });
    }
    localStorage.setItem("teamList", JSON.stringify(teams));
    document.location.href = "result.html";
  }
});
