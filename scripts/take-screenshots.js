import captureWebsite from "capture-website";
import slugify from "@sindresorhus/slugify";
import path from "path";
import fs from "fs";

// Take screenshot for each site
async function takeScreenshots(sites) {
  for (const site of sites) {
    const outputFileName = getOutputFileName(site.url);
    const outputFilePath = getOutputFilePath(outputFileName);

    // Lazy capturing
    // if the screenshot already exists, skip capturing
    if (!fs.existsSync(outputFilePath)) {
      try {
        await captureWebsite.file(site.url, outputFilePath, {
          timeout: 30,
          type: "jpeg",
          quality: 0.5,
        });
      } catch (error) {
        console.error(
          `Error capturing screenshot for ${site.url}:`,
          error.message
        );
        continue;
      }
    }
  }
}

const rootDir = process.cwd();

function getOutputFilePath(name) {
  return path.join(rootDir, "public", "img", "websites", `${name}.png`);
}

function getOutputFileName(href) {
  return slugify(new URL(href).hostname);
}

//
function getWebsitesData() {
  const inputFilePath = path.join(process.cwd(), "data", "websites.json");
  const rawData = fs.readFileSync(inputFilePath, "utf-8");
  const websites = JSON.parse(rawData);
  return websites;
}

//
async function main() {
  const websites = getWebsitesData();
  await takeScreenshots(websites);
  console.log(`Finished taking screenshots for ${websites.length} websites.`);
}

main();
