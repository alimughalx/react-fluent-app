const base = document.querySelector("base");
const baseHref = base ? base.getAttribute("href") : "/";
const basename = baseHref ? baseHref.replace(/\/$/, "") : "";

export default basename;