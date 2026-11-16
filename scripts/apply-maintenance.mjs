// Runs automatically after `npm run build` (npm "postbuild" hook).
// Adds or removes the out/MAINTENANCE_MODE flag file that public/.htaccess
// checks on every request, based on MAINTENANCE_MODE in site.config.mjs.
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { MAINTENANCE_MODE } from "../site.config.mjs";

const flag = new URL("../out/MAINTENANCE_MODE", import.meta.url);

if (!existsSync(new URL("../out/", import.meta.url))) {
  console.error("apply-maintenance: out/ not found, run `next build` first.");
  process.exit(1);
}

if (MAINTENANCE_MODE === true) {
  writeFileSync(flag, "");
  console.log("Maintenance mode: ON  (out/MAINTENANCE_MODE written, site will return HTTP 500)");
} else {
  rmSync(flag, { force: true });
  console.log("Maintenance mode: OFF (site will run normally)");
}
