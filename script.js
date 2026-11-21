let score=0, score1=0, score2=0, lives=3, level=1, timeLeft=60, timer, turn=1;
let player="Guest", player2="Player 2";
let is2Player=false, mode="mixed";
let currentAnswer=null;

let bank={
  science:[{q:"What planet is called Red Planet?", opts:["Mars","Venus","Jupiter","Saturn"], ans:"Mars"},{q:"Water formula?", opts:["H2O","CO2","O2","NaCl"], ans:"H2O"}],
  biology:[{q:"Powerhouse of cell?", opts:["Mitochondria","Nucleus","Ribosome","Golgi"], ans:"Mitochondria"}],
  english:[{q:"Past tense of 'go'?", opts:["Went","Goed","Gone","Going"], ans:"Went"}],
  physics:[{q:"Unit of Force?", opts:["Newton","Watt","Joule","Volt"], ans:"Newton"}],
  commercial:[{q:"What is Profit?", opts:["Selling - Cost","Cost - Selling","Cost + Selling","Tax"], ans:"Selling - Cost"}],
  art:[{q:"Who painted Mona Lisa?", opts:["Da Vinci","Picasso","Van Gogh","Rembrandt"], ans:"Da Vinci"}],
  jamb:[{q:"[JAMB] What is 2 + 2 x 3?", opts:["8","10","12","6"], ans:"8"},{q:"[JAMB] Synonym of 'Happy'?", opts:["Joyful","Sad","Angry","Tired"], ans:"Joyful"}],
  waec:[{q:"[WAEC] Capital of Nigeria?", opts:["Abuja","Lagos","Kano","Enugu"], ans:"Abuja"},{q:"[WAEC] 10% of 200?", opts:["20","10","30","40"], ans:"20"}]
};
let facts=["You are smart!","Keep going!","Pius you can do it!"];

function saveNames(){
  let p1=document.getElementById("player1Name").value.trim();
  let p2=document.getElementById("player2Name").value.trim();
  if(p1) player=p1;
  if(p2) player2=p2;
  document.getElementById("playerDisplay").textContent="Players: "+player+" vs "+player2;
  alert("Saved! "+player+" vs "+player2);
}

// === THE CHOOSE PART YOU WANT ===
function setMode(m){
  mode=m;
  let names={
    maths:'📚 SUBJECT: Maths - Only Maths go come',
    english:'📚 SUBJECT: English - Only English go come',
    science:'📚 SUBJECT: Science - Only Science go come',
    biology:'📚 SUBJECT: Biology - Only Biology go come',
    physics:'📚 SUBJECT: Physics - Only Physics go come',
    commercial:'📚 SUBJECT: Commercial - Only Commercial go come',
    art:'📚 SUBJECT: Art - Only Art go come',
    jamb:'🎓 EXAM: JAMB - Only JAMB go come',
    waec:'📚 EXAM: WAEC - Only WAEC go come',
    mixed:'🎲 Mixed - Everything go mix'
  };
  document.getElementById("modeDisplay").textContent="You choose: "+names[m];
  alert("You choose "+names[m]+"\nNow press START GAME!");
}

function toggle2Player(){
  is2Player=!is2Player;
  document.getElementById("twoPlayerBtn").textContent=is2Player?"👥 2-Player: ON":"👥 2-Player: OFF";
}

function startGame(){
  score=0; score1=0; score2=0; lives=3; level=1; timeLeft=60; turn=1;
  document.getElementById("gameOver").textContent="";
  clearInterval(timer);
  timer=setInterval(()=>{
    timeLeft--;
    document.getElementById("time").textContent=timeLeft+"s";
    if(timeLeft<=0) endGame();
  },1000);
  nextQuestion();
}

function nextQuestion(){
  if(is2Player){
    let cur=turn===1?player:player2;
    document.getElementById("question").textContent="✋ PASS LAPTOP TO "+cur.toUpperCase()+"!";
    document.getElementById("options").innerHTML=`<button onclick="showRealQuestion()" style="background:#ffd93d;color:black;padding:15px;font-size:18px;">👉 I'm ${cur}, Show My Question</button>`;
    document.getElementById("turnInfo").textContent=`🎯 Turn: ${cur} (P${turn}) | ${player}: ${score1} - ${player2}: ${score2}`;
    return;
  }
  showRealQuestion();
}

function showRealQuestion(){
  let chosenMode=mode;
  if(mode==='mixed'){
    let keys=['science','biology','english','physics','commercial','art','jamb','waec'];
    chosenMode = Math.random()>0.3 ? keys[Math.floor(Math.random()*keys.length)] : 'maths';
  }
  if(chosenMode==='maths'){
    let a=Math.floor(Math.random()*10)+1, b=Math.floor(Math.random()*10)+1;
    let ans=a+b;
    document.getElementById("question").textContent=`[MATHS] What is ${a} + ${b} = ?`;
    showOptions([ans,ans+2,ans-2,ans+5].sort(()=>Math.random()-0.5), ans);
  } else {
    let qData=bank[chosenMode][Math.floor(Math.random()*bank[chosenMode].length)];
    document.getElementById("question").textContent=qData.q;
    showOptions([...qData.opts].sort(()=>Math.random()-0.5), qData.ans);
  }
  document.getElementById("fact").textContent=facts[Math.floor(Math.random()*facts.length)];
}

function showOptions(opts, ans){
  currentAnswer=ans;
  let html="";
  opts.forEach(o=>{ html+=`<button onclick="checkAnswer('${o}')">${o}</button>`; });
  document.getElementById("options").innerHTML=html;
}

function checkAnswer(ans){
  let cur=turn===1?player:player2;
  if(String(ans)===String(currentAnswer)){
    if(is2Player){ if(turn===1) score1+=10; else score2+=10; }
    else score+=10;
    document.getElementById("feedback").textContent=`Correct ${cur}! +10`;
  } else {
    lives--;
    document.getElementById("feedback").textContent=`Wrong ${cur}! Answer is ${currentAnswer}`;
    if(lives<=0){ endGame(); return; }
  }
  if(is2Player) turn=turn===1?2:1;
  document.getElementById("score").textContent=is2Player?`${player}: ${score1} | ${player2}: ${score2}`:score;
  document.getElementById("lives").textContent="❤️".repeat(lives);
  setTimeout(nextQuestion, 1000);
}

function endGame(){
  clearInterval(timer);
  if(is2Player){
    let winner=score1>score2?player:score2>score1?player2:"Draw";
    document.getElementById("gameOver").textContent=`FINAL - ${player}: ${score1} | ${player2}: ${score2} - ${winner==="Draw"?"Draw!":"Winner: "+winner}`;
  } else {
    document.getElementById("gameOver").textContent=`Time up! ${player}, Final Score: ${score}`;
  }
}
function restartGame(){ location.reload(); }