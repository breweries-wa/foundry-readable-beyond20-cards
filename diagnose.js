// Readable Beyond20 Cards - diagnostic. Paste into the browser console (F12) on the game page.
// Read-only: it inspects the newest Beyond20 card and copies a report to the clipboard.
(async () => {
  const r = {};
  const mod = game.modules.get("readable-beyond20-cards");
  r.module = mod ? { active: mod.active, version: mod.version, styles: [...(mod.styles ?? [])].map(s => s.src ?? s) } : "not installed";

  // v14 pulls module CSS in through @import inside an inline <style>, so look inside import rules too.
  const imports = [];
  const walk = (sheet, depth = 0) => {
    imports.push((depth ? "  ".repeat(depth) + "@import " : "") + (sheet.href || "inline <style>"));
    let rules;
    try { rules = sheet.cssRules; } catch (e) { imports.push("  ".repeat(depth + 1) + "(rules unreadable: cross-origin)"); return; }
    for (const rule of rules) if (rule instanceof CSSImportRule && rule.styleSheet) walk(rule.styleSheet, depth + 1);
      else if (rule instanceof CSSImportRule) imports.push("  ".repeat(depth + 1) + "@import FAILED " + rule.href);
  };
  for (const s of document.styleSheets) walk(s);
  r.ourSheetInPage = imports.filter(x => x.includes("readable-beyond20"));

  const src = r.module?.styles?.[0];
  if (src) {
    // Foundry stores the resolved path (modules/<id>/...), so resolve it as given.
    const url = new URL(src, document.baseURI).href;
    try { const res = await fetch(url, { cache: "no-store" }); r.fetch = { url, status: res.status, bytes: (await res.text()).length }; }
    catch (e) { r.fetch = { url, error: String(e) }; }
  }

  const msgs = document.querySelectorAll(".beyond20-message");
  const m = msgs[msgs.length - 1];
  if (m) {
    const cs = getComputedStyle(m);
    // These custom properties are only set by this module's stylesheet.
    r.varsOnCard = { "--rb20-text": cs.getPropertyValue("--rb20-text"), "--rb20-title": cs.getPropertyValue("--rb20-title") };
    const roll = m.querySelector("[class*=beyond20-roll-detail]");
    r.rollColor = roll && getComputedStyle(roll).color;
    r.titleColor = getComputedStyle(m.querySelector("details summary, .beyond20-title")).color;
  }
  const text = JSON.stringify(r, null, 2);
  console.log(text);
  try { await navigator.clipboard.writeText(text); console.log("Report copied to clipboard"); }
  catch (e) { console.log("Couldn't copy automatically: select the report above and copy it."); }
})();
