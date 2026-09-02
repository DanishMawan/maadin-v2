const HOT = new Set(["1,2", "3,1"]);

function inner() {
  const cells: string[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const x = 14 + c * 66;
      const y = 14 + r * 56;
      const on = HOT.has(`${r},${c}`);
      const idx = r * 6 + c;
      cells.push(
        `<g class="pop" style="--dd:${120 + idx * 22}ms"><rect x="${x}" y="${y}" width="58" height="48" rx="8" class="${on ? "s-a" : "s-d"}" fill="none"/>` +
          (on ? `<circle cx="${x + 29}" cy="${y + 24}" r="6" class="dot-a"/>` : "") +
          "</g>"
      );
    }
  }
  return cells.join("");
}

/** Ports build.py's illus_parcelgrid(): a survey grid with two positions scored and shortlisted. */
export function IllusParcelgrid() {
  return (
    <div className="illus" data-rv>
      <svg
        className="fig"
        viewBox="0 0 420 260"
        role="img"
        aria-label="A survey grid of parcels with two positions scored and shortlisted."
        dangerouslySetInnerHTML={{ __html: inner() }}
      />
    </div>
  );
}
