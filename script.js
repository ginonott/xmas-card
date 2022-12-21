const elements = document.querySelectorAll('[data-repeat]');
const maxWidth = parseInt(getComputedStyle(document.body).getPropertyValue('--width').split('px')[0]) - 200;

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

  let update;
  update = function() {
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  
  document.body.onclick = () => window.location.reload()

  const container = document.querySelector('.container');
  container.style.height = window.document.body.getBoundingClientRect().height;