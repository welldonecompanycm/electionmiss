const params = new URLSearchParams(location.search);

/* ===== INIT VOTES ===== */
function initVotes(){
  if(!localStorage.getItem("votes")){
    const votes = {
      22:0,19:0,23:0,21:0,17:0,24:0,26:0,25:0
    };
    localStorage.setItem("votes",JSON.stringify(votes));
  }
}

/* ===== ADD VOTE ===== */
function addVote(id,qty){
  const votes = JSON.parse(localStorage.getItem("votes"));
  votes[id] += qty;
  localStorage.setItem("votes",JSON.stringify(votes));
}

/* ===== LOAD VOTE PAGE ===== */
function loadVote(){
  initVotes();
  document.getElementById("photo").src="images/"+params.get("img");
  document.getElementById("name").innerText=params.get("name");
  document.getElementById("number").innerText="Candidate n°"+params.get("id");
}

/* ===== GO PAYMENT ===== */
function goPay(votes,amount){
  addVote(params.get("id"),votes);
  location.href="merci.html";
}

/* ===== RANKING ===== */
function loadRanking(){
  initVotes();
  const votes = JSON.parse(localStorage.getItem("votes"));
  const list = document.getElementById("ranking");

  const sorted = Object.entries(votes)
    .sort((a,b)=>b[1]-a[1]);

  sorted.forEach(([id,count],i)=>{
    const div = document.createElement("div");
    div.className="rank-item";
    div.innerHTML=`<strong>#${i+1}</strong> Candidate n°${id} <span>${count} votes</span>`;
    list.appendChild(div);
  });
}