/**
 * Unifies build.py's contact_form() (segmented-control contact form, used on
 * home + contact) and the investors page's inline data-room form. Both stay
 * client-side only / no submission endpoint (PLACEHOLDERS.md D3, unchanged).
 * Segmented-control behavior is wired generically by ClientEffects (`[data-seg]`).
 */
export function ContactForm({ variant = "contact" }: { variant?: "contact" | "dataroom" }) {
  if (variant === "dataroom") {
    return (
      <form className="panel formwrap" data-rv style={{ marginTop: "var(--gap-4)" }} noValidate>
        <div className="field">
          <label htmlFor="dr-name">Full name</label>
          <input id="dr-name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="dr-fund">Fund or entity</label>
          <input id="dr-fund" type="text" />
        </div>
        <div className="field">
          <label htmlFor="dr-email">Corporate email</label>
          <input id="dr-email" type="email" required />
        </div>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: "var(--gap-3)" }}>
          <input type="checkbox" id="dr-nda" required style={{ width: "auto", marginTop: 3 }} />
          <span className="body">
            I agree to execute a standard mutual non-disclosure agreement covering proprietary
            valuations and models.
          </span>
        </label>
        <button className="btn btn--primary" type="submit">
          Request access <i aria-hidden="true">&rarr;</i>
        </button>
        <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
          <span className="ph">No form endpoint configured. PLACEHOLDERS D3.</span>
        </p>
      </form>
    );
  }

  return (
    <form className="panel" data-form noValidate>
      <p className="eyebrow" style={{ marginBottom: "var(--gap-3)" }}>
        <span>What is this about?</span>
      </p>
      <div className="seg" data-seg>
        <button type="button" data-key="invest" data-value="Investment / Seed Round" aria-pressed="true">
          Invest
        </button>
        <button type="button" data-key="build" data-value="Partnership or collaboration" aria-pressed="false">
          Partner / Build
        </button>
        <button type="button" data-key="advisory" data-value="Advisory / Fractional CRO or CAIO" aria-pressed="false">
          Advisory
        </button>
      </div>
      <p className="mono" data-seg-note style={{ marginBottom: "var(--gap-4)" }}>
        Investor enquiries reach Arshad directly. Materials are shared under NDA.
      </p>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="company">Company or fund</label>
        <input id="company" name="company" type="text" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="topic">Topic</label>
        <select id="topic" name="topic" required defaultValue="Investment / Seed Round">
          <option>Investment / Seed Round</option>
          <option>Partnership or collaboration</option>
          <option>Advisory / Fractional CRO or CAIO</option>
          <option>Thimar platform</option>
          <option>Speaking / media</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="btn btn--primary" type="submit">
        Send message <i aria-hidden="true">&rarr;</i>
      </button>
      <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
        <span className="ph">No form endpoint configured. PLACEHOLDERS D3.</span>
      </p>
    </form>
  );
}
