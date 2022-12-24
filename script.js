const elements = document.querySelectorAll('[data-repeat]');
const maxWidth = parseInt(getComputedStyle(document.body).getPropertyValue('--width').split('px')[0]) - 200;

const secretKeys = ['cl-music', 'cl-balloon', 'cl-snowman', 'cl-tree', 'cl-train', 'cl-snow', 'cl-cabin', 'cl-sled'];

function loadProgress() {
    if (!localStorage.getItem('progress')) {
        const p = {};
        for (const k of secretKeys) {
            p[k] = false;
        }

        localStorage.setItem('progress', JSON.stringify(p));
    }

    return JSON.parse(localStorage.getItem('progress'));
}

function saveProgress(progress) {
    localStorage.setItem('progress', JSON.stringify(progress));
}

const progress = loadProgress();
let hasWon = false;

const winSound = new Audio('assets/win.wav');

function revealCL(id) {
    progress[id] = true;
    const element = document.getElementById(id);
    element.innerText = element.dataset.reveal;
    saveProgress(progress);

    if (Object.values(progress).reduce((prev, curr) => prev && curr) && !hasWon) {
        hasWon = true;
        document.querySelector('#win').classList.remove('dnone');
        showChecklist();
        winSound.play();
    }
}

function getRandRange(min, max) {
    return Math.random() * (max - min) + min;
  }

for (const e of elements) {
    const minX = e.dataset.repeatXRangeMin ? parseInt(e.dataset.repeatXRangeMin) : 0;
    const maxX = e.dataset.repeatXRangeMax ? parseInt(e.dataset.repeatXRangeMax) : 200;
    const minY = e.dataset.repeatYRangeMin ? parseInt(e.dataset.repeatYRangeMin) : 0;
    const maxY = e.dataset.repeatYRangeMax ? parseInt(e.dataset.repeatYRangeMax) : 0;
    const yProperty = e.dataset.repeatYProperty || 'bottom';

    const parent = e.parentNode;

    // remove the original element
    parent.removeChild(e);

    for (let x = 0; x < maxWidth; x = getRandRange(minX + x, maxX + minX + x)) {
        const y = -1 * getRandRange(minY, maxY);
        const clone = e.cloneNode(true);
        clone.style.left = `${x}px`;
        clone.style[yProperty] = `${y}px`;
        parent.appendChild(clone);

    }
}

const tileElements = document.querySelectorAll('[data-tile]');
for (const e of tileElements) {
    const tiles = e.dataset.tile;
    const offset = e.dataset.offset;
    const parent = e.parentElement;
    for (let i = 1; i < tiles; i++) {
        const clone = e.cloneNode(true);
        const left = parseInt((clone.style.left ?? '0px').split('px')[0]);
        const newLeft = left + (i * offset);
        clone.style.left = `${newLeft}px`;
        parent.appendChild(clone);
    }
}

const audio = new Audio("/assets/jingle_bells.mp3");
audio.loop = true;
let startedMusic = false;
function playMusic() {
    if (startedMusic) {
        return;
    }

    startedMusic = true;
    audio.play();

    revealCL('cl-music');
}

const balloonPop = new Audio("/assets/balloon_pop.wav");
balloonPop.volume = 0.5;

for (const element of document.querySelectorAll('.balloon')) {
    element.onclick = () => {
        balloonPop.play();
        imgs = element.querySelectorAll('img');
        imgs[0].style.visibility = 'hidden';
        imgs[1].style.animation = 'fall 3s ease';
        imgs[1].onanimationend = () => {
            element.remove();
        }

        revealCL('cl-balloon');
    }
}

const trainWhistleSound = new Audio('/assets/train_whistle.wav')
trainWhistleSound.volume = 0.5;
function trainWhistle() {
    trainWhistleSound.play();
    revealCL('cl-train');
}

for (const element of document.querySelectorAll('.snowtree-tall')) {
    element.onclick = () => {
        element.src = "/assets/snowy_tree_tall.png";
        revealCL('cl-tree');
    }
}

document.querySelector('.container').style.height = `${window.innerHeight}px`;

window.onresize = () => {
    document.querySelector('.container').style.height = `${window.innerHeight}px`;
}

function closeIntro() {
    document.querySelector('.intro').classList.add('slide-out');
    // set checklist
    setTimeout(() => {
        for (const k of secretKeys) {
            if (progress[k]) {
                revealCL(k);
            }
        };
    }, 2500);
}

function toggleChecklist() {
    document.querySelector('.checklist').classList.toggle('hidden');

}

function showChecklist() {
    document.querySelector('.checklist').classList.remove('hidden');
}

function hideChecklist() {
    document.querySelector('.checklist').classList.add('hidden');
}

function makeItSnow() {
    particlesJS("particles-js", {
        particles: {
        number: {
            value: 52,
            density: {
            enable: true,
            value_area: 631.3280775270874
            }
        },
        color: {
            value: "#fff"
        },
        shape: {
            type: "circle",
            stroke: {
            width: 0,
            color: "#000000"
            },
            polygon: {
            nb_sides: 5
            },
            image: {
            src: "img/github.svg",
            width: 100,
            height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
            }
        },
        line_linked: {
            enable: false,
            distance: 500,
            color: "#ffffff",
            opacity: 0.4,
            width: 2
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "bottom",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
            }
        }
        },
        retina_detect: true
    });
    revealCL('cl-snow');
}

function merryGayXmas() {
    document.querySelector('#gay-christmas > .speech-bubble').classList.toggle('hidden');
    revealCL('cl-snowman');
}

const knock = new Audio('assets/knock.mp3');
let knockPlayed = false;
function turnOnCabin() {
    const light = document.querySelector('#cabin-light');
    light.classList.toggle('hidden');
    light.classList.add('cabin-light');

    const smokePuffList = document.querySelector('#smoke-puffs');
    smokePuffList.classList.toggle('hidden');
    for (const element of smokePuffList.children) {
        element.classList.toggle('hidden');
        element.classList.add('smoke-puff');
    }

    if (!knockPlayed) {
        knock.play();
        knockPlayed = true;
        setTimeout(() => {
            knock.pause();
        }, 3000);
    }

    revealCL('cl-cabin');
}

function launchSled() {
    for(const element of document.querySelector('#sled').children) {
        element.classList.add('launch')
    }

    revealCL('cl-sled');
}
