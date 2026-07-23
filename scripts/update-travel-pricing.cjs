const fs = require("node:fs");

const filePath = "src/App.jsx";
const original = fs.readFileSync(filePath, "utf8");
const currentCopy = '{ number: "03", title: "Travel / Coverage", items: ["Service area: 30 mile radius", "$0.65 per mile beyond service area"] },';
const updatedCopy = '{ number: "03", title: "Travel / Coverage", items: ["$0.65 per mile", "Charged regardless of distance"] },';

if (!original.includes(currentCopy) && !original.includes(updatedCopy)) {
  throw new Error("Travel pricing copy was not found in src/App.jsx.");
}

if (original.includes(currentCopy)) {
  fs.writeFileSync(filePath, original.replace(currentCopy, updatedCopy));
  console.log("Updated travel pricing copy.");
} else {
  console.log("Travel pricing copy is already current.");
}
