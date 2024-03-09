// 참여자 입력 Element를 return하는 함수
function createItemEl(value = "") {
  const newItem = document.createElement("div");
  newItem.classList.add("participant-item");
  newItem.innerHTML =
    `  <input class="participant-input" value="${value}"/>` +
    `  <button class="participant-delete-btn">×</button>`;
  return newItem;
}

// 참여자 추가 버튼 Element
const newAddBtnEl = document.createElement("button");
newAddBtnEl.classList.add("participant-add-btn");
newAddBtnEl.textContent = "+";

// LocalStorage에서 참여자 명단 가져오기
let participants = JSON.parse(localStorage.getItem("participants"));
const participantList = document.querySelector(".participant-list");
if (participants === null) {
  // LocalStorage에 참여자 명단이 없을 때 빈칸과 버튼 생성
  participantList.appendChild(createItemEl());
  participantList.appendChild(newAddBtnEl);
} else {
  // LocalStorage에서 참여자 명단을 가져와 목록과 버튼 생성
  for (let i = 0; i < participants.length; i++)
    participantList.appendChild(createItemEl(participants[i].name));
  participantList.appendChild(newAddBtnEl);
}

// 화면 클릭 이벤트 처리
const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  // + 버튼 클릭
  if (e.target.classList.contains("participant-add-btn")) {
    document.querySelector(".participant-add-btn").remove();
    participantList.appendChild(createItemEl());
    participantList.appendChild(newAddBtnEl);
  }

  // × 버튼 클릭
  if (e.target.classList.contains("participant-delete-btn")) {
    e.target.closest(".participant-item").remove();
  }

  // 초기화 버튼 클릭
  if (e.target.classList.contains("reset-btn")) {
    if (confirm("초기화 하시겠습니까?")) {
      participantList.innerHTML = "";
      participantList.appendChild(createItemEl());
      participantList.appendChild(newAddBtnEl);
    }
  }

  // 다음 버튼 클릭
  if (e.target.classList.contains("next-btn")) {
    let participantInputs = document.getElementsByClassName("participant-input");
    let newParticipants = [];
    let index = 0;
    for (let i = 0; i < participantInputs.length; i++)
      if (participantInputs[i].value.trim() != "")
        newParticipants[index++] = { name: participantInputs[i].value.trim() };
    if (newParticipants.length < 2) return alert("참여자 명단을 입력해주세요.");
    localStorage.setItem("participants", JSON.stringify(newParticipants));
    document.location.href = "configuration.html";
  }
});
