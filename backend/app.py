from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app)

# Load Logistic Regression model and vectorizer
model = joblib.load('./model/model.pkl')
vectorizer = joblib.load('./model/vectorizer.pkl')

# Keyword-based category detection
CATEGORY_KEYWORDS = {
    "OTP/Security": ["otp", "verification code", "login code", "security code", "password", "login alert"],
    "Banking/Financial": ["account", "transaction", "debit", "credit", "balance", "bank", "upi", "ifsc", "fund", "statement"],
    "Shopping/Offers": ["sale", "discount", "offer", "buy now", "deal", "shopping", "coupon", "cashback"],
    "Lottery/Prize": ["lottery", "won", "winner", "jackpot", "prize", "congratulations", "free gift"],
    "Personal": ["hi", "hello", "see you", "call me", "how are you", "good night", "happy birthday", "thank you", "thanks"],
    "Telecom/Recharge": ["data balance", "validity", "recharge", "plan", "talktime", "internet pack"],
    "Travel/Booking": ["flight", "train", "booking", "ticket", "hotel", "pnr", "trip", "journey"],
    "Health/Wellness": ["appointment", "doctor", "hospital", "insurance", "health", "wellness", "mediclaim"],
    "Jobs/Career": ["job", "career", "interview", "walk-in", "hiring", "resume", "apply now"],
    "Education": ["exam", "test", "class", "tuition", "school", "college", "admission", "course"],
    "Scam/Fraud": ["click here", "urgent", "suspended", "phishing", "verify now", "account locked", "claim reward"],
    "General/Uncategorized": []
}

def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = text.lower()
    return ' '.join([word for word in text.split() if word not in stop_words])

def classify_category(message):
    message_lower = message.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in message_lower:
                return category
    return "General/Uncategorized"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get("message", "")
    
    if not message:
        return jsonify({"error": "Message is required"}), 400

    # Spam/Ham Detection using Logistic Regression
    cleaned = clean_text(message)
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]
    label = 'spam' if prediction == 1 else 'ham'

    # Category Detection
    category = classify_category(message)

    return jsonify({
        "label": label,
        "category": category
    })

if __name__ == '__main__':
    app.run(debug=True)
