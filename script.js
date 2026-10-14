const items = [
  {
    id: 'orig',
    type: 'Original',
    src: 'original-detail.png',
    isReal: true,
    desc: 'Correct! This is the original painting. Notice the angel in the top-left corner.'
  },
  {
    id: 'a',
    type: 'AI Detail A',
    src: 'a-detail.png',
    isReal: false,
    desc: 'Incorrect! This is AI Detail A. The AI completely omitted the angel in the top-left corner.'
  },
  {
    id: 'b',
    type: 'AI Detail B',
    src: 'b-detail.png',
    isReal: false,
    desc: 'Incorrect! This is AI Detail B. It is an AI restoration, though very close to the original.'
  }
];

function setupGame() {
  const container = document.getElementById('cards-container');
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  
  container.innerHTML = '';
  shuffled.forEach((item, index) => {
    const optionLetter = String.fromCharCode(65 + index);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.src}" alt="Option ${optionLetter}">
      <button onclick="checkAnswer('${item.id}')">Select Image ${optionLetter}</button>
    `;
    container.appendChild(card);
  });
}

function checkAnswer(selectedId) {
  const feedback = document.getElementById('game-feedback');
  const gallerySection = document.getElementById('gallery-section');
  const selected = items.find(i => i.id === selectedId);

  feedback.style.display = 'block';
  
  let message = selected.isReal 
    ? `<strong>🎉 Correct!</strong> ${selected.desc}`
    : `<strong>❌ Not quite!</strong> ${selected.desc}`;

  feedback.className = selected.isReal ? 'success' : 'incorrect';
  feedback.innerHTML = `
    <p>${message}</p>
    <p><em>Scroll down to see the full solution gallery!</em></p>
    <button class="restart-btn" onclick="resetGame()">Play Again / Gioca di nuovo 🔄</button>
  `;

  gallerySection.style.display = 'block';
}

function resetGame() {
  const feedback = document.getElementById('game-feedback');
  const gallerySection = document.getElementById('gallery-section');
  
  feedback.style.display = 'none';
  gallerySection.style.display = 'none';
  
  setupGame();
}

function toggleComment(commentId) {
  const comment = document.getElementById(commentId);
  if (comment.style.display === 'block') {
    comment.style.display = 'none';
  } else {
    comment.style.display = 'block';
  }
}

window.onload = setupGame;
