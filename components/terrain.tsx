export function Terrain() {
  return (
    <div className="terrain" aria-hidden="true">
      <img
        src="/img/terrain-light.webp"
        srcSet="/img/terrain-light-1200.webp 1200w, /img/terrain-light.webp 2000w"
        sizes="100vw"
        width={2000}
        height={1000}
        alt=""
        decoding="async"
      />
    </div>
  );
}
