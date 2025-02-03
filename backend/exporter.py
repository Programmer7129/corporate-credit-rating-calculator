import joblib
import json
import numpy as np
import os

# Load trained model and scaler
model_path = os.path.join(os.path.dirname(__file__), "best_rf_model.pkl")
model = joblib.load(model_path)

scaler_path = os.path.join(os.path.dirname(__file__), "scaler.pkl")
scaler = joblib.load(scaler_path)


# Extract model parameters
model_json = {
    "n_estimators": model.n_estimators,
    "max_depth": model.max_depth,
    "feature_importances": model.feature_importances_.tolist(),  # Convert ndarray to list
    "trees": [
        {
            "feature": tree.tree_.feature.tolist(),
            "threshold": tree.tree_.threshold.tolist(),
            "children_left": tree.tree_.children_left.tolist(),
            "children_right": tree.tree_.children_right.tolist(),
            "value": tree.tree_.value.tolist()
        }
        for tree in model.estimators_
    ]
}

# Save the model JSON
with open("model.json", "w") as f:
    json.dump(model_json, f)

# Save the scaler mean & variance
scaler_json = {
    "mean": scaler.mean_.tolist(),  # Convert ndarray to list
    "scale": scaler.scale_.tolist()  # Convert ndarray to list
}

with open("scaler.json", "w") as f:
    json.dump(scaler_json, f)

print("✅ Model and Scaler exported to JSON successfully!")