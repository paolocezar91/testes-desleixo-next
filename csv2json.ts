import fs from "fs";
import { parse } from "csv-parse";
import path from "path";

interface NestedObject {
  [key: string]: string | NestedObject | Array<NestedObject>;
}

const questions: NestedObject[] = [];

// Function to convert a flat object with dot notation to a nested object
function convertToNestedObject(flatObj: Record<string, string>): NestedObject {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    if (value === "") continue; // Skip empty values

    const keys = key.split(".");
    let current: NestedObject = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        // If we're dealing with an array index
        const nextKey = keys[i + 1];
        if (!isNaN(Number(nextKey))) {
          (current[k] as NestedObject[]) = Array.isArray(current[k])
            ? (current[k] as NestedObject[])
            : [];
        } else {
          current[k] = (current[k] as NestedObject) || {};
        }
        current = current[k] as NestedObject;
      }
    }
  }

  return result;
}

function printUsage(): never {
  console.log("Usage: node csv2json.ts <input-csv-path> <output-json-path>");
  console.log("Example: node csv2json.ts ./input.csv ./output.json");
  process.exit(1);
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  printUsage();
}

const [inputPath, outputPath] = args;

// Resolve absolute paths
const resolvedInputPath = path.resolve(inputPath);
const resolvedOutputPath = path.resolve(outputPath);

// Check if input file exists
if (!fs.existsSync(resolvedInputPath)) {
  console.error(`Error: Input file '${inputPath}' does not exist`);
  process.exit(1);
}

// Create output directory if it doesn't exist
const outputDir = path.dirname(resolvedOutputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read and parse the CSV file
fs.createReadStream(resolvedInputPath)
  .pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  )
  .on("data", (row: Record<string, string>) => {
    questions.push(convertToNestedObject(row));
  })
  .on("end", () => {
    // Write the result to a JSON file
    const output = {
      questions,
    };

    fs.writeFileSync(resolvedOutputPath, JSON.stringify(output, null, 2));

    console.log(`Conversion complete! Check ${outputPath}`);
  })
  .on("error", (error: Error) => {
    console.error("Error processing CSV:", error.message);
    process.exit(1);
  });
