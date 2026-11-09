const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const heartContainer = document.getElementById('heartContainer');
const bgMusic = document.getElementById('bgMusic');

let yesScale = 1;
let noScale = 1;
let noShift = 15; 
let musicStarted = false;

// Reassurance phrases that switch when she hits NO
const phrases = [
  "ARE YOU SURE? 🥺",
  "THINK AGAIN! 👀",
  "PRETTY PLEASE? 💞",
  "WRONG BUTTON! ❌",
  "YOU DON'T MEAN THAT! 😭",
  "MAYBE RE-READ THE OPTION? 🤔"
];
let phraseIndex = 0;

function startMusic() {
  if (!musicStarted) {
    bgMusic.play()
      .then(() => { musicStarted = true; })
      .catch(error => console.log("Audio playback failed:", error));
  }
}

noBtn.addEventListener('click', () => {
  startMusic();

  // Change title text
  question.innerHTML = phrases[phraseIndex];
  phraseIndex = (phraseIndex + 1) % phrases.length;

  // Grow YES button
  yesScale += 0.35;
  yesBtn.style.transform = `scale(${yesScale})`;
  
  // Shrink NO button
  noScale -= 0.12;
  noBtn.style.transform = `scale(${noScale})`;
  
  // Push NO button away to the right so it doesn't get covered
  if (noShift > 2) {
    noShift -= 3;
    noBtn.style.right = `${noShift}%`;
  }
  
  if (noScale <= 0.2) {
    noBtn.style.display = 'none';
  }
});

yesBtn.addEventListener('click', () => {
  startMusic();

  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  question.innerHTML = "YAY! ❤️ BEST DECISION EVER!";
  heartContainer.innerHTML = "🥳🎉💖";

  // Massive continuous confetti celebration
  var duration = 6 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.8 }
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.8 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
});
