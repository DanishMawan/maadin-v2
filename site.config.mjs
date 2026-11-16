/**
 * Site-wide switches.
 *
 * MAINTENANCE_MODE
 *   true  -> the whole site returns HTTP 500 with public/500.html to every visitor
 *   false -> the site runs normally
 *
 * Change the value, commit, and push to main. The deploy workflow rebuilds and
 * uploads the site, and the change is live once the deploy finishes (usually
 * 1-2 minutes). scripts/apply-maintenance.mjs reads this after `next build`;
 * the blocking itself is done by Apache (public/.htaccess).
 */
export const MAINTENANCE_MODE = true;
