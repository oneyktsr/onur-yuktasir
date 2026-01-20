export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec2 uOffset;
  uniform vec2 uResolution;
  uniform vec2 uMousePos;
  uniform float uZoom;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform float uGridCols;
  uniform sampler2D uImageAtlas;
  uniform vec3 uBackgroundColor; // Yeni: Arka plan rengi

  varying vec2 vUv;

  void main() {
    vec2 screenUV = (vUv - 0.5) * 2.0;

    // Fish-Eye Distortion
    float radius = length(screenUV);
    float distortion = 1.0 - 0.08 * radius * radius;
    vec2 distortedUV = screenUV * distortion;

    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 worldCoord = distortedUV * aspectRatio;

    worldCoord *= uZoom;
    worldCoord += uOffset;

    vec2 cellPos = worldCoord / uCellSize;
    vec2 cellId = floor(cellPos);
    vec2 cellUV = fract(cellPos);

    float margin = 0.05;
    bool inImageArea = cellUV.x > margin && cellUV.x < (1.0 - margin) &&
                       cellUV.y > margin && cellUV.y < (1.0 - margin);

    float totalCells = uTextureCount;
    float cellIndex = mod(cellId.x + cellId.y * 5.0, totalCells);

    if (cellIndex < 0.0) cellIndex += totalCells;
    cellIndex = floor(cellIndex);

    // Başlangıç rengi olarak bizim bej rengimizi kullanıyoruz
    vec3 color = uBackgroundColor;

    if (inImageArea) {
        float cols = uGridCols;
        float row = floor(cellIndex / cols);
        float col = mod(cellIndex, cols);

        vec2 atlasCellSize = vec2(1.0 / cols, 1.0 / cols);
        vec2 uvInCell = (cellUV - margin) / (1.0 - 2.0 * margin);

        // Y ekseni düzeltmesi
        vec2 atlasUV = (vec2(col, row) + vec2(uvInCell.x, 1.0 - uvInCell.y)) * atlasCellSize;

        color = texture2D(uImageAtlas, atlasUV).rgb;
    }

    // Vignette: Siyah yerine arka plan rengine doğru solma
    float vignette = smoothstep(1.5, 0.5, radius); // 1.5'tan 0.5'e doğru azalır
    color = mix(uBackgroundColor, color, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
