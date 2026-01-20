<template>
  <div
    ref="container"
    class="fixed inset-0 w-full h-full z-0 overflow-hidden cursor-grab active:cursor-grabbing bg-[#0d0e13]"
  ></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { vertexShader, fragmentShader } from "~/utils/shaders";

const props = defineProps<{
  items: any[];
}>();

const container = ref<HTMLElement | null>(null);

// Global Değişkenler
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let material: THREE.ShaderMaterial;
let plane: THREE.Mesh;
let geometry: THREE.PlaneGeometry;
let animationId: number;
let initialized = false;
let isMobile = false; // Mobil kontrolü için değişken

const state = {
  offset: new THREE.Vector2(0, 0),
  targetOffset: new THREE.Vector2(0, 0),
  isDragging: false,
  lastMouse: new THREE.Vector2(0, 0),
};

// --- TEXTURE ATLAS ---
const createTextureAtlas = async (urls: string[]) => {
  if (urls.length === 0) return null;

  const count = urls.length;
  const cols = Math.ceil(Math.sqrt(count));
  const canvasSize = 2048;
  const cellSize = canvasSize / cols;

  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  // ATLAS ARKAPLANI: #0d0e13
  ctx.fillStyle = "#0d0e13";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const loadPromises = urls.map((url) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(new Image());
      img.src = url;
    });
  });

  const images = await Promise.all(loadPromises);

  images.forEach((img, i) => {
    if (!img.width) return;

    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * cellSize;
    const y = row * cellSize;

    const scale = Math.max(cellSize / img.width, cellSize / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const offX = (cellSize - w) / 2;
    const offY = (cellSize - h) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, cellSize, cellSize);
    ctx.clip();
    ctx.drawImage(img, x + offX, y + offY, w, h);
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return { texture, cols };
};

// --- INIT THREE.JS ---
const initThree = async () => {
  if (!container.value || props.items.length === 0 || initialized) return;

  if (renderer) {
    renderer.dispose();
    container.value.innerHTML = "";
  }

  // Mobil kontrolü (Ekran genişliğine göre)
  isMobile = window.innerWidth < 768;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // --- PERFORMANS AYARLARI ---
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: false,
  });

  renderer.setSize(container.value.clientWidth, container.value.clientHeight);

  // DPR Optimizasyonu
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // RENDERER ARKAPLANI: #0d0e13
  renderer.setClearColor(0x0d0e13, 1);

  container.value.appendChild(renderer.domElement);

  const imageUrls = props.items
    .map((p) => p.cover?.image || "")
    .filter((url) => url !== "");
  const atlasData = await createTextureAtlas(imageUrls);

  if (!atlasData) return;

  const { texture, cols } = atlasData;

  // DÜZELTME: Güvenli Dispose İşlemi (Optional Chaining)
  if (material?.uniforms?.uImageAtlas?.value) {
    material.uniforms.uImageAtlas.value.dispose();
  }

  // ZOOM AYARI: Mobilde daha geriden (geniş) bak
  // Masaüstü: 1.0, Mobil: 1.5 (Değer arttıkça kartlar küçülür/uzaklaşır)
  const zoomValue = isMobile ? 1.5 : 1.0;

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uOffset: { value: new THREE.Vector2(0, 0) },
      uResolution: {
        value: new THREE.Vector2(
          container.value.clientWidth,
          container.value.clientHeight,
        ),
      },
      uMousePos: { value: new THREE.Vector2(0, 0) },
      uZoom: { value: zoomValue },
      uCellSize: { value: 0.6 },
      uTextureCount: { value: props.items.length },
      uGridCols: { value: cols },
      uImageAtlas: { value: texture },
      // SHADER ARKAPLANI: #0d0e13
      uBackgroundColor: { value: new THREE.Color(0x0d0e13) },
    },
  });

  geometry = new THREE.PlaneGeometry(2, 2);
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  initialized = true;
  animate();
};

const animate = () => {
  if (!initialized) return;

  animationId = requestAnimationFrame(animate);
  state.offset.lerp(state.targetOffset, 0.075);

  // Güvenli Erişim
  if (material?.uniforms?.uOffset) {
    material.uniforms.uOffset.value.copy(state.offset);
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

// --- EVENTS ---
const onMouseDown = (e: MouseEvent | TouchEvent) => {
  state.isDragging = true;
  let x = 0,
    y = 0;
  if ("touches" in e) {
    const touch = e.touches[0];
    if (touch) {
      x = touch.clientX;
      y = touch.clientY;
    }
  } else {
    x = (e as MouseEvent).clientX;
    y = (e as MouseEvent).clientY;
  }
  state.lastMouse.set(x, y);
};

const onMouseMove = (e: MouseEvent | TouchEvent) => {
  if (!state.isDragging) return;
  let x = 0,
    y = 0;

  // Mobil olup olmadığını olay anında kontrol etmeye gerek yok,
  // ancak touch event geliyorsa zaten mobildir.
  let isTouch = false;

  if ("touches" in e) {
    const touch = e.touches[0];
    if (touch) {
      x = touch.clientX;
      y = touch.clientY;
      isTouch = true;
    } else return;
  } else {
    x = (e as MouseEvent).clientX;
    y = (e as MouseEvent).clientY;
  }

  const dx = x - state.lastMouse.x;
  const dy = y - state.lastMouse.y;

  // HASSASİYET AYARI (SENSITIVITY)
  // Masaüstü: 0.0025 (Standart)
  // Mobil: 0.006 (Daha hızlı aksın, parmak az hareket etse de çok gitsin)
  const sensitivity = isMobile || isTouch ? 0.006 : 0.0025;

  state.targetOffset.x -= dx * sensitivity;
  state.targetOffset.y += dy * sensitivity;
  state.lastMouse.set(x, y);
};

const onMouseUp = () => {
  state.isDragging = false;
};

const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  // Scroll hassasiyeti
  const strength = 0.0025;
  state.targetOffset.x += e.deltaX * strength;
  state.targetOffset.y -= e.deltaY * strength;
};

const onResize = () => {
  if (!container.value || !renderer || !material?.uniforms?.uResolution) return;

  const w = container.value.clientWidth;
  const h = container.value.clientHeight;

  // Resize sırasında mobil kontrolünü güncelle
  isMobile = w < 768;

  renderer.setSize(w, h);
  material.uniforms.uResolution.value.set(w, h);

  // Resize olunca zoom'u da güncelle
  if (material.uniforms.uZoom) {
    material.uniforms.uZoom.value = isMobile ? 1.5 : 1.0;
  }
};

// --- LIFECYCLE ---
watch(
  () => props.items,
  (newItems) => {
    if (newItems && newItems.length > 0 && !initialized) {
      nextTick(() => {
        initThree();
      });
    }
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  window.addEventListener("resize", onResize);
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("touchstart", onMouseDown);
  window.addEventListener("touchmove", onMouseMove);
  window.addEventListener("touchend", onMouseUp);
  window.addEventListener("wheel", onWheel, { passive: false });
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("mousedown", onMouseDown);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("touchstart", onMouseDown);
  window.removeEventListener("touchmove", onMouseMove);
  window.removeEventListener("touchend", onMouseUp);
  window.removeEventListener("wheel", onWheel);

  if (material?.uniforms?.uImageAtlas?.value) {
    material.uniforms.uImageAtlas.value.dispose();
  }
  if (renderer) renderer.dispose();
  if (geometry) geometry.dispose();
  initialized = false;
});
</script>
