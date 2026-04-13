import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";
import { watch, writeFileSync, readFileSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR     = join(__dirname, "..", "styles");
const INPUTS_DIR     = join(STYLES_DIR, "inputs");
const INPUT_CSS_PATH = join(INPUTS_DIR, "input.css");
const GLOBAL_CSS_OUT = join(STYLES_DIR, "tailwind.css");
const PREVIEW_PATH   = join(__dirname, "..", "..", ".storybook", "preview.ts");

let isProcessing = false;

function detectActiveBrand() {
  try {
    const content = readFileSync(PREVIEW_PATH, "utf8");
    const match   = content.match(/import\s+['"].*\/(\w+)-tailwind\.css['"]/);
    if (match) {
      const brand = match[1];
      return brand === "tailwind" ? "input.css" : `${brand}-input.css`;
    }
  } catch { /* usa default */ }
  return "beo-input.css";
}

async function processGlobalCss() {
  try {
    const inputCss = readFileSync(INPUT_CSS_PATH, "utf8");
    const result   = await postcss([tailwindcss()]).process(inputCss, { from: INPUT_CSS_PATH });
    writeFileSync(GLOBAL_CSS_OUT, result.css, "utf8");
    console.log("✅ Global CSS actualizado: tailwind.css");
  } catch (error) {
    console.error("❌ Error al procesar CSS global:", error.message || error);
  }
}

async function processTailwindToLit(inputCss, outputPath) {
  const componentName  = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    const componentCss    = readFileSync(inputCss, "utf8");
    const activeInputFile = detectActiveBrand();
    const activeInputPath = join(INPUTS_DIR, activeInputFile);
    const combinedCss     = `@reference "${activeInputPath}";\n\n${componentCss}`;

    const result = await postcss([tailwindcss(), cssnano({ preset: "default" })]).process(combinedCss, { from: inputCss });
    const componentStyles = result.css.trim();
    const hostStyles = `:host{box-sizing:border-box}:host *,:host *::before,:host *::after{box-sizing:inherit}[hidden]{display:none!important}`;
    const litCss = `import { css } from 'lit';\nexport default css\`${hostStyles}${componentStyles}\`;\n`;

    writeFileSync(outputFilePath, litCss, "utf8");
    console.log(`✅ Regenerado: ${componentName}.lit.ts`);
  } catch (error) {
    console.error(`❌ Error procesando ${inputCss}:`, error.message || error);
  } finally {
    isProcessing = false;
  }
}

// ── Inicio ─────────────────────────────────────────────────────
console.log("🚀 Procesando CSS global...");
await processGlobalCss();

console.log("👀 Observando cambios en:");
console.log("   - src/styles/inputs/*.css");
console.log("   - src/stories/**/*.css");

// Watcher global CSS
watch(INPUTS_DIR, async (_, filename) => {
  if (!filename?.endsWith(".css") || isProcessing) return;
  isProcessing = true;
  console.log(`\n🔄 Cambio en inputs/${filename}`);
  await processGlobalCss();
  isProcessing = false;
});

// Watcher componentes
watch(COMPONENTS_DIR, { recursive: true }, async (_, filename) => {
  if (!filename?.endsWith(".css") || filename.includes(".lit.ts") || isProcessing) return;
  isProcessing = true;
  const pathFileModified = join(COMPONENTS_DIR, filename);
  const pathFileOutput   = join(COMPONENTS_DIR, filename, "../");
  console.log(`\n🔄 Cambio en componente: ${filename}`);
  await processTailwindToLit(pathFileModified, pathFileOutput);
});
