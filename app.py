# Importing required libraries
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

# Creating a Flask App
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Loading the Pickle Model
model = pickle.load(open("LogisticRegressionModel.pkl", "rb"))

# Predicting the results based on user's answers
@app.route("/PredictResults", methods = ["POST"])
@cross_origin()
def predictResults():
    print("Request Recieved")
    recievedData = request.json
    query_df = pd.DataFrame(recievedData["Selected Options"], index=[0])
    prediction = model.predict(query_df)
    # print(recievedData["Selected Options"])
    # print(query_df)
    # print(prediction[0])
    return str(prediction[0])

if __name__ == "__main__":
    app.run(debug = True)