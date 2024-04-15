import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import tensorflowjs as tfjs

# Step 1: Data Preprocessing
# Load the data from CSV
data = pd.read_csv('..\hackniite_2024\src\data\DivvyBikeHistory-Subset-Michigan-Ida-Friday.csv')

# Preprocess the data
X = data['time']

# Convert times
Y = pd.to_datetime(data.pop('time'), format='%H:%M:%S')

# Scale the data
X_scales = [max(X), min(X)]
X_data = (X-X_scales[1])/(X_scales[0]-X_scales[1])
Y_scales = [max(Y), min(Y)]
Y_data = (Y-Y_scales[1])/(Y_scales[0]-Y_scales[1])


# regressor = Sequential()
# regressor.add(Dense(units = 10, input_shape=(1,), activation="relu"))
# regressor.add(Dense(units = 50, activation="relu"))
# regressor.add(Dense(units = 500, activation="relu"))
# regressor.add(Dense(units = 50, activation="relu"))
# regressor.add(Dense(units = 10, activation="relu"))
# regressor.add(Dense(units = 1))
# regressor.compile(optimizer = 'adam', loss = 'mean_squared_error')
# regressor.summary()

# history = regressor.fit(X_data, Y_data, epochs = 30, validation_split=0.1)
# plt.title('Model Loss')
# plt.ylabel('Loss')
# plt.xlabel('Epochs')
# plt.plot(history.history['loss'])
# plt.legend(['Train'])
# plt.show()

# predicted_y_data = regressor.predict(X_data)
# predicted_y = predicted_y_data*(Y_scales[0]-Y_scales[1]) + Y_scales[1]
# plt.scatter(X,Y)
# plt.plot(X,predicted_y.reshape(-1,1))

# tfjs.converters.save_keras_model(regressor, "model")
# print(X_scales, Y_scales)
