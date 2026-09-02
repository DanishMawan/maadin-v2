import Link from "next/link";
import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <Link className="logo" href="/">
              <Logo />
            </Link>
            <p className="body" style={{ marginTop: "var(--gap-2)", maxWidth: "30ch" }}>
              The intelligence layer for the world&rsquo;s most valuable natural assets.
            </p>
            <p className="mono" style={{ marginTop: "var(--gap-3)" }}>
              Maadin.AI
              <br />
              United States &middot; Global Advisory
            </p>
          </div>
          <div>
            <h2>Links</h2>
            <ul>
              <li>
                <Link href="/platform">Platform</Link>
              </li>
              <li>
                <Link href="/demos">Demos</Link>
              </li>
              <li>
                <Link href="/work">Work</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/advisory">Advisory</Link>
              </li>
              <li>
                <Link href="/investors">Investors</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <Link href="/contact">Send a message</Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/arshadkhanxai/" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://spe.org" rel="noopener">
                  SPE
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot__meta">
          <span>&copy; 2026 Maadin.AI</span>
          <span>31&deg;58&prime;N 102&deg;04&prime;W &middot; Permian Basin ref.</span>
          <span data-clock>--:--:-- UTC</span>
          <span>Illustrative data throughout. See PLACEHOLDERS.md</span>
        </div>
      </div>
    </footer>
  );
}
