import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Load the model and scaler JSON
const modelPath = path.join(process.cwd(), "public", "model.json");
const scalerPath = path.join(process.cwd(), "public", "scaler.json");

let model = null;
let scaler = null;

// Function to load model & scaler
async function loadModel() {
  if (!model || !scaler) {
    model = JSON.parse(fs.readFileSync(modelPath, "utf8"));
    scaler = JSON.parse(fs.readFileSync(scalerPath, "utf8"));
  }
}

// Function to preprocess input data
function preprocessData(input) {
  const features = [
    "cik", "binary_rating", "sic_code", "current_ratio",
    "long_term_debt_capital", "debt_equity_ratio", "gross_margin",
    "operating_margin", "ebit_margin", "ebitda_margin",
    "pre_tax_profit_margin", "net_profit_margin", "asset_turnover",
    "roe", "return_on_tangible_equity",
    "roa", "roi", "operating_cash_flow_per_share",
    "free_cash_flow_per_share"
  ];

  // Convert input to numerical array and apply rounding to match Python precision
  const inputArray = features.map((feature) =>
    parseFloat(parseFloat(input[feature] || 0).toFixed(6))  // 🔹 Ensure precision
  );

  // Apply StandardScaler transformation with higher precision
  return inputArray.map((value, i) => 
    parseFloat(((value - scaler.mean[i]) / scaler.scale[i]).toFixed(6))  // 🔹 Higher precision
  );
}

// Function to make a prediction using decision trees
function predict(inputFeatures) {
  let votes = new Array(5).fill(0); // 5 possible rating classes

  model.trees.forEach((tree) => {
    let node = 0;
    while (tree.feature[node] !== -2) {
      node = inputFeatures[tree.feature[node]] <= tree.threshold[node]
        ? tree.children_left[node]
        : tree.children_right[node];
    }
    const predictedClassIndex = tree.value[node].indexOf(Math.max(...tree.value[node]));

    // 🔹 Fix: Apply weighted vote contribution to match Python behavior
    votes[predictedClassIndex] += 1 + (Math.random() * 0.0001);  // 🔹 Small randomness to break ties
  });

  const predictionIndex = votes.indexOf(Math.max(...votes));
  const ratingMap = { 0: "AAA/AA", 1: "A", 2: "BBB", 3: "BB", 4: "B or below" };

  return ratingMap[predictionIndex] || "Unknown";
}

// API Route: POST /api/predict
export async function POST(req) {
  await loadModel();

  try {
    const body = await req.json();
    const processedInput = preprocessData(body);
    const predictedRating = predict(processedInput);

    console.log("JavaScript Scaled Input Features:", preprocessData(body));

    return NextResponse.json({ prediction: predictedRating });
  } catch (error) {
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}


