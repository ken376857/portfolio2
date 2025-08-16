import * as THREE from 'https://unpkg.com/three@0.138.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-animation'),
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // 透明な背景

// Geometry
const geometry = new THREE.PlaneGeometry(20, 12, 100, 100);

// Shaders
const vertexShader = `
  uniform float u_time;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave 1: Large, slow diagonal waves - increased amplitude
    float wave1 = sin(pos.x * 0.3 + pos.y * 0.2 + u_time * 0.4) * 0.8;
    // Wave 2: Medium waves - increased amplitude and speed
    float wave2 = sin(pos.x * 0.6 + u_time * 1.0) * 0.5;
    // Wave 3: Fine ripples - increased amplitude
    float wave3 = sin(pos.y * 1.5 + u_time * 1.2) * 0.3;
    // Wave 4: Cross waves for more complexity
    float wave4 = cos(pos.x * 0.4 - pos.y * 0.3 + u_time * 0.6) * 0.4;

    pos.z = wave1 + wave2 + wave3 + wave4;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;
  void main() {
    vec3 color1 = vec3(0.3, 0.6, 1.0); // Bright Blue
    vec3 color2 = vec3(0.7, 0.9, 1.0); // Light Blue
    vec3 color3 = vec3(1.0, 1.0, 1.0); // White
    
    float mixFactor1 = 0.5 + sin(vUv.x * 8.0 + vUv.y * 5.0 + u_time * 0.5) * 0.5;
    float mixFactor2 = 0.5 + cos(vUv.x * 6.0 - vUv.y * 4.0 + u_time * 0.4) * 0.5;
    
    vec3 blend1 = mix(color1, color2, mixFactor1);
    vec3 finalColor = mix(blend1, color3, mixFactor2 * 0.7);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Material
const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0.0 }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation
function animate() {
  requestAnimationFrame(animate);
  material.uniforms.u_time.value += 0.025; // Increased speed
  renderer.render(scene, camera);
}

animate();

// なべけんの役割図アニメーション
function initRoleDiagramAnimation() {
    const roleSection = document.querySelector('.nabeken-role-section');
    const userLines = document.querySelectorAll('.user-line');
    const clientLines = document.querySelectorAll('.client-line');
    
    if (!roleSection) return;
    
    // IntersectionObserverでスクロール検知
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // なべけんから各アイコンへ線が描画されるアニメーション開始
                userLines.forEach(line => line.classList.add('animate-draw'));
                clientLines.forEach(line => line.classList.add('animate-draw'));
                
                // 一度実行したら監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // 30%表示されたときに発動
    });
    
    observer.observe(roleSection);
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', initRoleDiagramAnimation);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
