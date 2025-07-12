function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'plasticPirates') startPirates();
  if (id === 'treePlanters') startTreePlanters();
  if (id === 'mentalMaze') startMentalMaze();
  if (id === 'educationExpress') startQuizGame();
}

// --- Plastic Pirates ---
let pirateScore = 0, pirateInterval;
function startPirates() {
  pirateScore = 0;
  document.getElementById('pirateScore').textContent = pirateScore;
  const canvas = document.getElementById('piratesCanvas');
  const ctx = canvas.getContext('2d');

  let boat = { x: 180, y: 550, width: 40, height: 40 };
  let bottles = [];
  let jellyfish = [];

  function spawnItems() {
    if (Math.random() < 0.1) bottles.push({ x: Math.random()*360, y: 0 });
    if (Math.random() < 0.05) jellyfish.push({ x: Math.random()*360, y: 0 });
  }

  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnItems();

    // Draw boat
    ctx.fillStyle = 'brown';
    ctx.fillRect(boat.x, boat.y, boat.width, boat.height);

    // Draw bottles
    ctx.fillStyle = 'blue';
    bottles.forEach((b, i) => {
      b.y += 2;
      ctx.fillRect(b.x, b.y, 20, 20);
      if (b.y > 600) bottles.splice(i, 1);
      if (b.x < boat.x + 40 && b.x + 20 > boat.x && b.y < boat.y + 40 && b.y + 20 > boat.y) {
        pirateScore++;
        document.getElementById('pirateScore').textContent = pirateScore;
        bottles.splice(i, 1);
      }
    });

    // Draw jellyfish
    ctx.fillStyle = 'purple';
    jellyfish.forEach((j, i) => {
      j.y += 2;
      ctx.beginPath();
      ctx.arc(j.x, j.y, 15, 0, Math.PI * 2);
      ctx.fill();
      if (j.y > 600) jellyfish.splice(i, 1);
      if (j.x < boat.x + 40 && j.x + 15 > boat.x && j.y < boat.y + 40 && j.y + 15 > boat.y) {
        clearInterval(pirateInterval);
        alert('Game Over! Final Score: ' + pirateScore);
        showScreen('mainMenu');
      }
    });
  }

  pirateInterval = setInterval(updateGame, 30);

  document.onkeydown = function (e) {
    if (e.key === 'ArrowLeft') boat.x -= 10;
    if (e.key === 'ArrowRight') boat.x += 10;
  };
}

// --- Tree Planters United ---
let treeScore = 0;
function startTreePlanters() {
  treeScore = 0;
  const grid = document.getElementById('treeGrid');
  grid.innerHTML = '';
  document.getElementById('treeScore').textContent = treeScore;

  for (let i = 0; i < 25; i++) {
    const patch = document.createElement('div');
    patch.onclick = function () {
      if (!patch.classList.contains('planted')) {
        patch.classList.add('planted');
        patch.style.background = '#3e8914';
        treeScore++;
        document.getElementById('treeScore').textContent = treeScore;
        if (treeScore === 10) {
          document.body.style.background = '#b3f0b3'; // Forest mode!
        }
      }
    };
    grid.appendChild(patch);
  }
}

// --- Mental Health Maze (simplified placeholder) ---
let mazeScore = 0;
function startMentalMaze() {
  const canvas = document.getElementById('mazeCanvas');
  const ctx = canvas.getContext('2d');
  mazeScore = 0;
  document.getElementById('mazeScore').textContent = mazeScore;

  let player = { x: 10, y: 10 };
  let orbs = [{ x: 100, y: 100 }, { x: 300, y: 300 }, { x: 200, y: 50 }];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw player
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, 20, 20);
    // Draw orbs
    ctx.fillStyle = 'yellow';
    orbs.forEach((orb, i) => {
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, 10, 0, Math.PI * 2);
      ctx.fill();
      if (Math.abs(player.x - orb.x) < 20 && Math.abs(player.y - orb.y) < 20) {
        mazeScore++;
        orbs.splice(i, 1);
        document.getElementById('mazeScore').textContent = mazeScore;
      }
    });
  }

  document.onkeydown = function (e) {
    if (e.key === 'ArrowUp') player.y -= 10;
    if (e.key === 'ArrowDown') player.y += 10;
    if (e.key === 'ArrowLeft') player.x -= 10;
    if (e.key === 'ArrowRight') player.x += 10;
    draw();
  };

  draw();
}

// --- Education Express ---
let trainPos = 0;
const questions = [
  {
    q: "What does photosynthesis produce?",
    a: ["Oxygen", "Carbon", "Coal", "Water"],
    c: 0
  },
  {
    q: "How many planets are in the solar system?",
    a: ["7", "8", "9", "10"],
    c: 1
  }
];

function startQuizGame() {
  trainPos = 0;
  document.getElementById('trainPos').textContent = trainPos;
  nextQuestion();
}

function nextQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById('quizQuestion').textContent = q.q;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.a.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => {
      if (idx === q.c) {
        trainPos += 1;
        document.getElementById('trainPos').textContent = trainPos;
      } else {
        alert('Wrong Answer! Try again.');
      }
      nextQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}