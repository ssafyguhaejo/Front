// localStorage.setItem("teamList",'[{"teamName": "Team 1","members": ["강세현", "곽예빈", "김문희"],"teamLeader": true},{"teamName": "Team 2","members": ["박찬호", "구재승", "이경곤"],"teamLeader": true},{"teamName": "Team 3","members": ["박용빈", "이승철", "전상권", "조성빈"],"teamLeader": true}]');
// LocalStorage에서 팀원 데이터 가져오기
const teamListData = JSON.parse(localStorage.getItem("teamList")) || [];

// 팀원 데이터를 화면에 출력하는 함수
function renderTeamMembers() {
  const teamListElement = document.getElementById("teamList");
  teamListElement.innerHTML = ""; // 기존 내용 지우기

  // 팀마다 반복
  teamListData.forEach((teamData) => {
    const teamElement = document.createElement("div");
    teamElement.classList.add("team");

    // 팀 이름 추가
    const teamNameElement = document.createElement("div");
    teamNameElement.classList.add("team-name");
    teamNameElement.textContent = teamData.teamName;
    teamElement.appendChild(teamNameElement);

    // 팀원 목록 추가
    teamData.members.forEach((member) => {
      const memberElement = document.createElement("div");
      memberElement.classList.add("team-member");
      memberElement.textContent = member;
      teamElement.appendChild(memberElement);
    });

    teamListElement.appendChild(teamElement);
  });
}

// 페이지 로드 시 팀원 데이터 출력
window.onload = renderTeamMembers;
