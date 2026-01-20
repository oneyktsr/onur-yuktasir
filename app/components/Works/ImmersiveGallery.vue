<template>
  <div
    ref="container"
    class="fixed inset-0 w-full h-full z-0 overflow-hidden cursor-grab active:cursor-grabbing bg-[#0d0e13]"
    style="
      touch-action: none;
      overscroll-behavior: none;
      -webkit-user-select: none;
      user-select: none;
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

// --- INPUT HANDLING ---

// 1. TOUCH / MOUSE START
const onStart = (e: MouseEvent | TouchEvent) => {
  // KİLİT NOKTA: Tarayıcının "scroll mu drag mi?" diye düşünmesini engelle.
  // Bu satır olmazsa, tarayıcı önce dikey hareketi bekler.
  if (e.cancelable && e.type === "touchstart") {
    e.preventDefault();
  }

  state.isDragging = true;
  let x = 0,
    y = 0;

  if ("touches" in e) {
    const touch = (e as TouchEvent).touches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else {
    x = (e as MouseEvent).clientX;
    y = (e as MouseEvent).clientY;
  }

  state.lastMouse.set(x, y);
};

// 2. TOUCH / MOUSE MOVE
const onMove = (e: MouseEvent | TouchEvent) => {
  if (!state.isDragging) return;

  // KİLİT NOKTA 2: Hareket sırasında native scroll'u tamamen öldür.
  if (e.cancelable && e.type === "touchmove") {
    e.preventDefault();
  }

  let x = 0,
    y = 0;
  let isTouch = false;

  if ("touches" in e) {
    const touch = (e as TouchEvent).touches[0];
    if (touch) {
      x = touch.clientX;
      y = touch.clientY;
      isTouch = true;
    } else {
      return;
    }
  } else {
    x = (e as MouseEvent).clientX;
    y = (e as MouseEvent).clientY;
  }

  const dx = x - state.lastMouse.x;
  const dy = y - state.lastMouse.y;

  // Mobilde parmak hareketi daha az piksel kaplar, bu yüzden hassasiyeti artırıyoruz.
  const sensitivity = isMobile || isTouch ? 0.006 : 0.0025;

  state.targetOffset.x -= dx * sensitivity;
  state.targetOffset.y += dy * sensitivity;
  state.lastMouse.set(x, y);
};

// 3. TOUCH / MOUSE END
const onEnd = () => {
  state.isDragging = false;
};

// 4. TOUCHPAD & WHEEL
const onWheel = (e: WheelEvent) => {
  // Touchpad'in native geri/ileri veya scroll davranışını engelle
  e.preventDefault();

  const strength = 0.0025;

  // Touchpad ile hem X hem Y ekseninde serbest dolaşım
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

  // ÖNEMLİ: passive: false ayarı, preventDefault() kullanabilmek için şarttır.
  const opts = { passive: false };

  // Mouse Events (Window'a bağlıyoruz ki dışarı çıksa da yakalasın)
  window.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);

  // Touch Events (Doğrudan Container'a bağlıyoruz ki 'touch-action' etkili olsun)
  // Ancak move ve end olaylarını window'da tutmak, parmak ekrandan kaysa bile takibi sağlar.
  if (container.value) {
    container.value.addEventListener("touchstart", onStart, opts);
  }
  window.addEventListener("touchmove", onMove, opts);
  window.addEventListener("touchend", onEnd);

  // Wheel
  window.addEventListener("wheel", onWheel, { passive: false });
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);

  window.removeEventListener("mousedown", onStart);
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseup", onEnd);

  if (container.value) {
    container.value.removeEventListener("touchstart", onStart);
  }
  window.removeEventListener("touchmove", onMove);
  window.removeEventListener("touchend", onEnd);
  window.removeEventListener("wheel", onWheel);

  if (material?.uniforms?.uImageAtlas?.value) {
    material.uniforms.uImageAtlas.value.dispose();
  }
  if (renderer) renderer.dispose();
  if (geometry) geometry.dispose();
  initialized = false;
});
</script>
