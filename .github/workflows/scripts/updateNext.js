import fs from "fs";

const files = fs.readdirSync("./")
  .filter(f => f.startsWith("uam-") && f.endsWith(".png"));

const now = new Date(
  new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
);

function parseDate(name) {
  const match = name.match(/uam-(\d{6})\.png/);
  if (!match) return null;

  const [yy, mm, dd] = [
    match[1].slice(0,2),
    match[1].slice(2,4),
    match[1].slice(4,6)
  ];

  return new Date(`20${yy}-${mm}-${dd}`);
}

const future = files
  .map(f => ({ file: f, date: parseDate(f) }))
  .filter(x => x.date && x.date > now)
  .sort((a,b) => a.date - b.date);

if (future.length > 0) {
  fs.copyFileSync(future[0].file, "nextuam.png");
  console.log("Updated nextuam.png");
}