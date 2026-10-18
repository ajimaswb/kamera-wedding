// Filter "Noir — Tri-X pushed": hitam putih kontras tinggi, grain kasar, vignette kuat.
// Dipakai di halaman tamu (pratinjau) dan album (tampilan & unduhan). Foto asli berwarna tetap tersimpan.
window.Noir = (() => {
  const P = { contrast: 1.5, grain: 20, vignette: 0.45 };

  // Proses canvas di tempat
  function applyToCanvas(cv) {
    const W = cv.width, H = cv.height, x = cv.getContext("2d");
    const d = x.getImageData(0, 0, W, H), p = d.data;
    // Grain diskalakan dengan resolusi supaya terlihat sama di thumbnail maupun ukuran penuh
    const g = P.grain * Math.min(1.4, Math.max(0.6, Math.max(W, H) / 1200));
    let s = 12345;
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) - 0.5;
    const lut = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      lut[i] = (t < 0.5 ? 0.5 * Math.pow(2 * t, P.contrast) : 1 - 0.5 * Math.pow(2 * (1 - t), P.contrast)) * 255;
    }
    const cx = W / 2, cy = H / 2, md2 = cx * cx + cy * cy;
    for (let y = 0; y < H; y++) {
      const dy2 = (y - cy) * (y - cy);
      for (let X = 0; X < W; X++) {
        const i = (y * W + X) * 4;
        const lum = (0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]) | 0;
        let l = lut[lum];
        l *= 1 - P.vignette * (((X - cx) * (X - cx) + dy2) / md2);
        l += rnd() * g * 2;
        p[i] = p[i + 1] = p[i + 2] = l;
      }
    }
    x.putImageData(d, 0, 0);
    return cv;
  }

  // Gambar (img/canvas) -> canvas berfilter, diperkecil ke `max` px
  function render(img, max) {
    const w0 = img.naturalWidth || img.width, h0 = img.naturalHeight || img.height;
    const s = Math.min(1, (max || Infinity) / Math.max(w0, h0));
    const cv = document.createElement("canvas");
    cv.width = Math.round(w0 * s); cv.height = Math.round(h0 * s);
    cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
    return applyToCanvas(cv);
  }

  function loadImage(src) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img); img.onerror = rej;
      img.src = typeof src === "string" ? src : URL.createObjectURL(src);
    });
  }

  const toBlob = (cv, q) => new Promise((res, rej) => cv.toBlob(b => b ? res(b) : rej(), "image/jpeg", q || 0.9));

  return { render, applyToCanvas, loadImage, toBlob };
})();
