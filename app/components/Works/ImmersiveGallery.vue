<template>
  <div
    ref="container"
    class="fixed inset-0 w-full h-full z-0 overflow-hidden cursor-grab active:cursor-grabbing bg-[#0d0e13]"
    style="
      touch-action: none;
      overscroll-behavior: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    "
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
let isMobile = false;

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

  const isSmallScreen = window.innerWidth < 768;
  const canvasSize = isSmallScreen ? 1024 : 2048;

  const cellSize = canvasSize / cols;

  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d", { willReadFrequently: false });

  if (!ctx) return null;

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

  isMobile = window.innerWidth < 768;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: false,
    preserveDrawingBuffer: false,
  });

  renderer.setSize(container.value.clientWidth, container.value.clientHeight);

  const pixelRatioLimit = isMobile ? 1.5 : 2.0;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioLimit));
  renderer.setClearColor(0x0d0e13, 1);

  container.value.appendChild(renderer.domElement);

  const imageUrls = props.items
    .map((p) => p.cover?.image || "")
    .filter((url) => url !== "");
  const atlasData = await createTextureAtlas(imageUrls);

  if (!atlasData) return;

  const { texture, cols } = atlasData;

  if (material?.uniforms?.uImageAtlas?.value) {
    material.uniforms.uImageAtlas.value.dispose();
  }

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

  if (material?.uniforms?.uOffset) {
    material.uniforms.uOffset.value.copy(state.offset);
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

// --- INPUT HANDLING (GÜVENLİ VE HATASIZ) ---

// 1. TOUCH START
const onTouchStart = (e: TouchEvent) => {
  if (e.cancelable) e.preventDefault();

  // DÜZELTME: Parmak var mı kontrolü
  const touch = e.touches[0];
  if (!touch) return;

  state.isDragging = true;
  state.lastMouse.set(touch.clientX, touch.clientY);
};

// 2. TOUCH MOVE
const onTouchMove = (e: TouchEvent) => {
  if (e.cancelable) e.preventDefault();

  if (!state.isDragging) return;

  // DÜZELTME: Parmak var mı kontrolü
  const touch = e.touches[0];
  if (!touch) return;

  const x = touch.clientX;
  const y = touch.clientY;

  const dx = x - state.lastMouse.x;
  const dy = y - state.lastMouse.y;

  // Mobil hassasiyeti
  const sensitivity = 0.006;

  state.targetOffset.x -= dx * sensitivity;
  state.targetOffset.y += dy * sensitivity;

  state.lastMouse.set(x, y);
};

// 3. TOUCH END
const onTouchEnd = () => {
  state.isDragging = false;
};

// --- MOUSE HANDLING ---
const onMouseDown = (e: MouseEvent) => {
  state.isDragging = true;
  state.lastMouse.set(e.clientX, e.clientY);
};

const onMouseMove = (e: MouseEvent) => {
  if (!state.isDragging) return;

  const x = e.clientX;
  const y = e.clientY;

  const dx = x - state.lastMouse.x;
  const dy = y - state.lastMouse.y;

  const sensitivity = 0.0025;

  state.targetOffset.x -= dx * sensitivity;
  state.targetOffset.y += dy * sensitivity;

  state.lastMouse.set(x, y);
};

const onMouseUp = () => {
  state.isDragging = false;
};

// 4. WHEEL
const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  const strength = 0.0025;
  state.targetOffset.x += e.deltaX * strength;
  state.targetOffset.y -= e.deltaY * strength;
};

const onResize = () => {
  if (!container.value || !renderer || !material?.uniforms?.uResolution) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight;
  isMobile = w < 768;
  renderer.setSize(w, h);
  material.uniforms.uResolution.value.set(w, h);
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

  const opts = { passive: false };

  if (container.value) {
    container.value.addEventListener("touchstart", onTouchStart, opts);
    container.value.addEventListener("touchmove", onTouchMove, opts);
    container.value.addEventListener("touchend", onTouchEnd);

    container.value.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.value.addEventListener("wheel", onWheel, opts);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  if (container.value) {
    container.value.removeEventListener("touchstart", onTouchStart);
    container.value.removeEventListener("touchmove", onTouchMove);
    container.value.removeEventListener("touchend", onTouchEnd);

    container.value.removeEventListener("mousedown", onMouseDown);
    container.value.removeEventListener("wheel", onWheel);
  }

  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);

  if (material?.uniforms?.uImageAtlas?.value) {
    material.uniforms.uImageAtlas.value.dispose();
  }
  if (renderer) renderer.dispose();
  if (geometry) geometry.dispose();
  initialized = false;
});
</script>
