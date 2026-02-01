// 1. Floating Stickers Background
const stickers = [ '🌸',  '🌸',  '🌸',  '🌸',  '🌸',  '🌸'];
function createSticker() {
    const el = document.createElement('div');
    el.className = 'floating-sticker';
    el.innerHTML = stickers[Math.floor(Math.random() * stickers.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 30 + 20) + 'px';
    document.getElementById('floating-stickers-container').appendChild(el);
    setTimeout(() => el.remove(), 6000);
}
setInterval(createSticker, 1000);

// 2. Audio Control
const audio = document.getElementById('bgMusic');
document.body.addEventListener('click', () => { if(audio.paused) audio.play(); }, {once: true});

// 3. Gift Selection Logic
function revealGift(el, name) {
    if(!el.classList.contains('opened')) {
        el.classList.add('opened');
        el.style.opacity = '0.3';
        el.style.pointerEvents = 'none';
        
        const list = document.getElementById('gift-list');
        const card = document.createElement('div');
        card.className = 'collected-gift';
        card.innerHTML = name + " ✨";
        list.appendChild(card);
    }
}

// 4. Memory Puzzle Logic
const board = document.getElementById('board');

// 9 Unique images = 18 total items
const items = [
    'images/1.jpg', 'images/1.jpg',
    'images/2.jpg', 'images/2.jpg',
    'images/3.jpg', 'images/3.jpg',
    'images/4.jpg', 'images/4.jpg',
    'images/5.jpg', 'images/5.jpg',
    'images/6.jpg', 'images/6.jpg',
    'images/7.jpg', 'images/7.jpg',
    'images/8.jpg', 'images/8.jpg',
    'images/9.jpg', 'images/9.jpg'
];

let choices = [];
let matches = 0;

// Shuffle and create cards
items.sort(() => Math.random() - 0.5).forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-card';
    card.innerHTML = '?';
    
    card.onclick = () => {
        // Prevent clicking more than 2, clicking a "done" card, or clicking the same card twice
        if (choices.length < 2 && !card.classList.contains('done') && card !== choices[0]?.card) {
            
            // Set image with styles to ensure it fits the existing .p-card size
            card.innerHTML = `<img src="${item}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">`;
            card.style.background = 'white';
            
            choices.push({card, item});

            if (choices.length === 2) {
                if (choices[0].item === choices[1].item) {
                    choices[0].card.classList.add('done');
                    choices[1].card.classList.add('done');
                    choices = [];
                    matches++;
                    
                    // Dynamic check: total pairs is always length / 2
                    if (matches === items.length / 2) {
                        document.getElementById('puzzleMessage').classList.remove('hidden');
                    }
                } else {
                    setTimeout(() => {
                        choices.forEach(c => { 
                            c.card.innerHTML = '?'; 
                            c.card.style.background = '#ff85a1'; 
                            c.card.style.color = 'white'; 
                        });
                        choices = [];
                    }, 600);
                }
            }
        }
    };
    board.appendChild(card);
});

// 5. Runaway No Button
function moveNo() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 40) + 20;
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// 6. Celebration Logic
function celebrate() {
    document.getElementById('ask').classList.add('hidden');
    document.getElementById('final').classList.remove('hidden');
    audio.src = 'audio/I-wanna-be-yours.mp3';
    audio.play();
}