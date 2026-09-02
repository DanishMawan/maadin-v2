export function Logomark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 19.5V8.2c0-.7.85-1.05 1.32-.53L12 15l6.68-7.33c.47-.52 1.32-.17 1.32.53V19.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5.1" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <>
      <Logomark />
      Maadin
    </>
  );
}
