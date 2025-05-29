
// Global Variables
let currentQuoteIndex = 0;
let isSettingsOpen = false;
let isMusicPlaying = false;
let gameTimer = null;
let gameSeconds = 0;
let gameMoves = 0;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
        },
        shape: {
            type: ['circle', 'triangle', 'polygon'],
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 6
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Explore Website Function
function exploreWebsite() {
    playClickSound();
    createFireworks();
    document.querySelector('#gallery').scrollIntoView({
        behavior: 'smooth'
    });
}

// Create Fireworks Effect
function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.width = '10px';
            firework.style.height = '10px';
            firework.style.background = getRandomColor();
            firework.style.borderRadius = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '9999';
            firework.style.animation = 'fireworkExplode 1s ease-out forwards';
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 100);
    }
}

// Get Random Color
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#fd79a8', '#6c5ce7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        playClickSound();
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Quote Carousel
const quotes = [
    {
        text: "A real friend is one who walks in when the rest of the world walks out.",
        author: "Walter Winchell"
    },
    {
        text: "Friendship is the only cement that will ever hold the world together.",
        author: "Woodrow Wilson"
    },
    {
        text: "A friend is someone who knows all about you and still loves you.",
        author: "Elbert Hubbard"
    },
    {
        text: "In the sweetness of friendship let there be laughter and sharing of pleasures.",
        author: "Khalil Gibran"
    },
    {
        text: "True friendship comes when the silence between two people is comfortable.",
        author: "David Tyson"
    }
];

function showQuote(index) {
    const quoteCards = document.querySelectorAll('.quote-card');
    quoteCards.forEach(card => card.classList.remove('active'));
    
    setTimeout(() => {
        quoteCards[index].classList.add('active');
    }, 300);
}

function nextQuote() {
    playClickSound();
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(currentQuoteIndex);
}

function prevQuote() {
    playClickSound();
    currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    showQuote(currentQuoteIndex);
}

// Auto-advance quotes
setInterval(nextQuote, 5000);

// Quote Navigation Event Listeners
document.querySelector('.next-quote').addEventListener('click', nextQuote);
document.querySelector('.prev-quote').addEventListener('click', prevQuote);

// Memory Game Functions
function startMemoryGame() {
    playClickSound();
    const modal = document.getElementById('memoryGameModal');
    modal.style.display = 'block';
    initializeMemoryGame();
}

function initializeMemoryGame() {
    const gameBoard = document.getElementById('gameBoard');
    const symbols = ['❤️', '🌟', '😊', '🎈', '🌈', '🦋', '🌸', '🎭'];
    const cards = [...symbols, ...symbols]; // Duplicate for pairs
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    gameBoard.innerHTML = '';
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    gameMoves = 0;
    gameSeconds = 0;
    
    // Create card elements
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        memoryCards.push(card);
    });
    
    // Start timer
    startGameTimer();
    updateGameStats();
}

function flipCard(e) {
    const card = e.target;
    
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
        return;
    }
    
    playFlipSound();
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        gameMoves++;
        updateGameStats();
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Match found
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            matchedPairs++;
            
            playMatchSound();
            
            if (matchedPairs === 8) {
                // Game completed
                stopGameTimer();
                setTimeout(() => {
                    alert(`Congratulations! You won in ${gameMoves} moves and ${formatTime(gameSeconds)}!`);
                }, 500);
            }
        }, 1000);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        gameSeconds++;
        updateGameStats();
    }, 1000);
}

function stopGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function updateGameStats() {
    document.getElementById('moves').textContent = gameMoves;
    document.getElementById('timer').textContent = formatTime(gameSeconds);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Quiz Game
function startQuizGame() {
    playClickSound();
    const questions = [
        {
            question: "What's the most important quality in a friendship?",
            options: ["Trust", "Fun", "Similarity", "Proximity"],
            correct: 0
        },
        {
            question: "How often should friends communicate?",
            options: ["Daily", "Weekly", "As needed", "Monthly"],
            correct: 2
        },
        {
            question: "What's the best way to resolve conflicts with friends?",
            options: ["Ignore them", "Talk openly", "Get others involved", "Wait it out"],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            const answer = prompt(`${q.question}\n\n${q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nEnter number (1-4):`);
            
            if (answer && parseInt(answer) - 1 === q.correct) {
                score++;
                alert("Correct! 🎉");
            } else {
                alert(`Wrong! The correct answer was: ${q.options[q.correct]}`);
            }
            
            currentQuestion++;
            showQuestion();
        } else {
            alert(`Quiz completed! Your score: ${score}/${questions.length}\n\n${getScoreMessage(score, questions.length)}`);
        }
    }
    
    showQuestion();
}

function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "Excellent! You're a friendship expert! 🌟";
    if (percentage >= 60) return "Good job! You understand friendship well! 👍";
    if (percentage >= 40) return "Not bad! Keep learning about friendship! 😊";
    return "Keep practicing! Friendship is a journey! 💪";
}

// Photo Editor (Placeholder)
function openPhotoEditor() {
    playClickSound();
    alert("Photo Editor feature coming soon! 📸\n\nStay tuned for exciting updates where you can edit and enhance your friendship photos!");
}

// Mood Tracker (Placeholder)
function openMoodTracker() {
    playClickSound();
    const moods = ["😊 Happy", "😢 Sad", "😴 Tired", "🤗 Excited", "😌 Peaceful", "😤 Frustrated"];
    const mood = prompt(`How are you feeling today?\n\n${moods.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\nEnter number (1-6):`);
    
    if (mood && mood >= 1 && mood <= 6) {
        const selectedMood = moods[mood - 1];
        alert(`Mood recorded: ${selectedMood}\n\nThanks for sharing! Remember, it's okay to feel this way. Your friends are here for you! 💝`);
        createMoodParticles();
    }
}

function createMoodParticles() {
    const particles = ['💝', '🌈', '✨', '🦋', '🌸'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.fontSize = '2rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'floatUp 3s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, i * 200);
    }
}

// Settings Panel
function toggleSettings() {
    playClickSound();
    const panel = document.getElementById('settingsPanel');
    isSettingsOpen = !isSettingsOpen;
    panel.classList.toggle('open', isSettingsOpen);
}

// Theme Selector
document.getElementById('themeSelector').addEventListener('change', (e) => {
    const theme = e.target.value;
    const particlesContainer = document.getElementById('particles-js');
    
    switch (theme) {
        case 'gradient':
            particlesContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            break;
        case 'stars':
            particlesContainer.style.background = 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)';
            break;
        case 'hearts':
            particlesContainer.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
            break;
        case 'rainbow':
            particlesContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)';
            break;
    }
});

// Animation Speed Control
document.getElementById('animationSpeed').addEventListener('input', (e) => {
    const speed = e.target.value;
    document.documentElement.style.setProperty('--animation-speed', speed);
});

// Particle Density Control
document.getElementById('particleDensity').addEventListener('input', (e) => {
    const density = e.target.value;
    // Reinitialize particles with new density
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.number.value = density;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
});

// Music Player
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.querySelector('.music-toggle');
    
    if (isMusicPlaying) {
        music.pause();
        musicToggle.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        // Since we can't load external audio files easily, we'll simulate music
        musicToggle.classList.add('playing');
        isMusicPlaying = true;
        playBackgroundMusic();
    }
}

function playBackgroundMusic() {
    // Simulate background music with visual feedback
    const musicToggle = document.querySelector('.music-toggle');
    if (isMusicPlaying) {
        musicToggle.style.background = getRandomColor();
        setTimeout(() => {
            if (isMusicPlaying) {
                musicToggle.style.background = '';
                setTimeout(playBackgroundMusic, 500);
            }
        }, 500);
    }
}

// Sound Effects
function playClickSound() {
    if (document.getElementById('soundEffects').checked) {
        // Create a simple click sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

function playFlipSound() {
    if (document.getElementById('soundEffects').checked) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

function playMatchSound() {
    if (document.getElementById('soundEffects').checked) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Modal Close Functionality
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.style.display = 'none';
        if (gameTimer) {
            stopGameTimer();
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (gameTimer) {
                stopGameTimer();
            }
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.gallery-item, .timeline-item, .game-card, .quote-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add CSS animations for fireworks
const style = document.createElement('style');
style.textContent = `
    @keyframes fireworkExplode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize quotes with proper content
document.addEventListener('DOMContentLoaded', () => {
    const quoteCards = document.querySelectorAll('.quote-card');
    quotes.forEach((quote, index) => {
        if (quoteCards[index]) {
            quoteCards[index].innerHTML = `
                <p>"${quote.text}"</p>
                <span>- ${quote.author}</span>
            `;
        }
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (document.querySelector('#quotes').getBoundingClientRect().top <= window.innerHeight) {
                prevQuote();
            }
            break;
        case 'ArrowRight':
            if (document.querySelector('#quotes').getBoundingClientRect().top <= window.innerHeight) {
                nextQuote();
            }
            break;
        case 'Escape':
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
                if (gameTimer) {
                    stopGameTimer();
                }
            }
            if (isSettingsOpen) {
                toggleSettings();
            }
            break;
        case ' ':
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                toggleMusic();
            }
            break;
    }
});

// Performance optimization
let ticking = false;
function updateOnScroll() {
    // Throttle scroll events
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update navbar background
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            }
            
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Add some easter eggs
let clickCount = 0;
document.querySelector('.nav-logo').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        alert("🎉 Easter Egg Found! You discovered the secret click! 🎉");
        createFireworks();
        clickCount = 0;
    }
});

// Console message for developers
console.log(`
🌟 Welcome to Friendship Forever! 🌟
This website was built with love and lots of coffee ☕
Developed with modern web technologies and enhanced with AI assistance.

Features:
✨ Interactive animations
🎮 Fun games
🎵 Background music simulation
🎨 Customizable themes
📱 Responsive design
♿ Accessibility features

Feel free to explore the code and learn!
Happy coding! 💝
`);
