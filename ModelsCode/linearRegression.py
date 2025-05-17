import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import joblib
from google.colab import files

#  Load dataset
df = pd.read_csv("/content/realtor-data.zip.csv")

# 🧹 Initial cleaning
print("🧹 Cleaning data...")
print("\nInitial Dataset Info:")
print(df.info())

# Drop rows with missing values
df.dropna(inplace=True)
print(f"\n Rows remaining after dropna: {len(df)}")

# Encode categorical variables
label_cols = ['status', 'city', 'state']
label_encoders = {}
for col in label_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le

# === Feature Engineering ===
df['log_house_size'] = np.log1p(df['house_size'])
df['log_acre_lot'] = np.log1p(df['acre_lot'])
df['bed_bath'] = df['bed'] * df['bath']
df['log_price'] = np.log1p(df['price'])

# Select features and target
features = [
    'status', 'bed', 'bath', 'city', 'state', 'zip_code',
    'log_house_size', 'log_acre_lot', 'bed_bath'
]
target = 'log_price'

X = df[features]
y = df[target]

#  Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save the scaler
joblib.dump(scaler, 'linear_scaler.pkl')

#  Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)
print(f"\n📈 Training size: {len(X_train)}, 🧪 Testing size: {len(X_test)}")

#  Train Linear Regression model
model = LinearRegression()
print("\n Training Linear Regression model...")
model.fit(X_train, y_train)

#  Evaluate
y_pred_train = model.predict(X_train)
y_pred_test = model.predict(X_test)

train_mse = mean_squared_error(y_train, y_pred_train)
train_r2 = r2_score(y_train, y_pred_train)
test_mse = mean_squared_error(y_test, y_pred_test)
test_r2 = r2_score(y_test, y_pred_test)

print(f"\nTrain MSE: {train_mse:.2f}, R²: {train_r2:.4f}")
print(f" Test  MSE: {test_mse:.2f}, R²: {test_r2:.4f}")

# Optional: Convert predictions back to original price
predicted_prices = np.expm1(y_pred_test)
actual_prices = np.expm1(y_test)

#  Plot predicted vs actual prices
plt.figure(figsize=(8, 6))
plt.scatter(actual_prices, predicted_prices, alpha=0.3, color='blue')
plt.plot([actual_prices.min(), actual_prices.max()],
         [actual_prices.min(), actual_prices.max()],
         color='red', lw=2)
plt.xlabel("Actual Price")
plt.ylabel("Predicted Price")
plt.title("Predicted vs Actual Home Prices")
plt.grid(True)
plt.tight_layout()
plt.show()

#  Save and download model and preprocessing objects
joblib.dump(model, 'linear_regression_model.pkl')
joblib.dump(label_encoders, 'linear_label_encoders.pkl')

files.download('linear_regression_model.pkl')
files.download('linear_label_encoders.pkl')
files.download('linear_scaler.pkl')
