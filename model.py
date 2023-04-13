# Importing required libraries
import warnings 
warnings.filterwarnings('ignore')
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB 

# Reading the data from a CSV file
train_df = pd.read_csv('survey.csv')

# Dealing with missing data

# Getting rid of the variables "Timestamp", “Country, “Comments”, “State” 
# because they are irrelevant from the perspective of prediction
train_df.drop(columns=['Timestamp', 'Age', 'Gender', 'Country', 'state', 'comments'], inplace = True)

# We will be replacing the blank values with 'Don't Know' for work_interfere category and with 'No' for the self_employed category
train_df['work_interfere'] = train_df['work_interfere'].fillna('Don\'t know' )
train_df['self_employed'] = train_df['self_employed'].fillna('No')

# Label Encoding the categorical variables
from sklearn.preprocessing import LabelEncoder
object_cols = ['self_employed', 'family_history', 'treatment',
       'work_interfere', 'no_employees', 'remote_work', 'tech_company',
       'benefits', 'care_options', 'wellness_program', 'seek_help',
       'anonymity', 'leave', 'mental_health_consequence',
       'phys_health_consequence', 'coworkers', 'supervisor',
       'mental_health_interview', 'phys_health_interview',
       'mental_vs_physical', 'obs_consequence']
label_encoder = LabelEncoder()
for col in object_cols:
    label_encoder.fit(train_df[col])
    train_df[col] = label_encoder.transform(train_df[col])

print(len(object_cols))

# Spliting the Train and Test data
X = train_df.drop('treatment', axis = 1)
y = train_df['treatment']
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify = y, test_size = 0.3, random_state = 101)

# Training a LogisticRegression model on the Training Data
logisticRegressionModel = LogisticRegression()
logisticRegressionModel.fit(X_train, y_train)

print(type(X_test))

# Converting the model into a pickle file
pickle.dump(logisticRegressionModel, open("LogisticRegressionModel.pkl", "wb"))