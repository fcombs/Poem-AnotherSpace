var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

function getHexColor(r, g, b) {
  return '#' + (parseInt(r).toString(16)) + (parseInt(g).toString(16)) + (parseInt(b).toString(16));
}

var particles = [];

function addParticles() {
  for(var i = 0; i < 2000; i++) {
    particles.push({
      x: (window.innerWidth / 2)+(Math.random()*400-200),
      y: (window.innerHeight / 2)-Math.random()*15,
      z: Math.random()*1
    })
  }
}

function render() {
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(0, 0, 0, 0.2)';
  context.fill();
  
  particles.sort(function(a, b) {return a.z - b.z});
  
  for(var i = 0; i < particles.length; i++) {
    particles[i].x += (particles[i].z - 1) * 15;
    
    if(particles[i].x < window.innerWidth / 2) {
      particles[i].z += 0.005;
      particles[i].y += 0.4;
    }
    else {
      if(particles[i].z > 0.01) {
        particles[i].z -= 0.005;
        particles[i].y -= 0.4;
      }
    }
    
    context.beginPath();
    context.arc(particles[i].x, particles[i].y, particles[i].z, 0, 10);
    context.fillStyle = getHexColor(particles[i].z + 14, particles[i].z + 11, particles[i].z + 9);
    context.fill();
    context.closePath();
  }
  
  window.requestAnimationFrame(render);
}

addParticles();
render();