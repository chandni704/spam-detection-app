
## 📦 Spam / Ham Message Classifier

This project is a full-stack application that classifies user-input messages into **Spam** or **Ham** (not spam) and further categorizes spam into subdomains like `promotion`, `phishing`, `advertisement`, `lottery`, and more.

Built using:

* 🔥 **Flask (Python)** backend
* ⚛️ **ReactJS** frontend
* 🤖 Pre-trained ML model for message classification

---



---

## 🚀 Features

* Classifies messages as **Spam** or **Ham**
* Detects **Spam category**:

  * 🛒 `advertisement`
  * 🎣 `phishing`
  * 🎁 `lottery`
  * 🧾 `promotion`
  * 💰 `financial`
  * 📞 `scam`
  * 🔗 `URL-based`
* Elegant, animated UI with real-time feedback
* Displays classification label + spam category (if applicable)

---

## 🧠 Domains Classified

| Type     | Label  | Category Examples                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------------- |
| **Ham**  | `ham`  | Personal, Informational, Non-spam                                                            |
| **Spam** | `spam` | `promotion`, `advertisement`, `phishing`, `lottery`, `financial`, `scam`, `link-based`, etc. |

---

## ⚙️ Backend Setup Instructions

1. **Clone the Repository**:

```bash
git clone https://github.com/your-username/spam-classifier-app.git
cd spam-classifier-app/backend
```

2. **Create Virtual Environment** (Optional but recommended):

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**:

```bash
pip install -r requirements.txt
```

4. **Generate Model Files**:

If `model.pkl` and `vectorize.pkl` are missing from `backend/model/`, generate them by running:

```bash
python spam_detection_train.ipynb
```

> This script will train the classifier and save the model files under `backend/model/`.

5. **Run the Flask Server**:

```bash
python app.py
```

The Flask backend should now run on: `http://localhost:5000/`

---

## 💻 Frontend Setup Instructions

1. **Navigate to Frontend**:

```bash
cd ../frontend
```

2. **Install React Dependencies**:

```bash
npm install
```

3. **Start the React App**:

```bash
npm start
```

The React app will launch at: `http://localhost:3000/`

Ensure the backend is running on port `5000`.

---

## 📝 API Endpoint (Backend)

* **POST** `/predict`

### Request:

```json
{
  "message": "You’ve won a lottery! Click here to claim"
}
```

### Response:

```json
{
  "label": "spam",
  "category": "lottery"
}
```

---

## 🔍 Files to Verify

Ensure these are present **after training**:

```
backend/
└── model/
    ├── model.pkl         ✅
    └── vectorize.pkl     ✅
```

---

## 🧪 Test Message Examples

| Message                             | Prediction | Category      |
| ----------------------------------- | ---------- | ------------- |
| "Get 50% OFF now, limited offer!"   | spam       | advertisement |
| "Please confirm your account info." | spam       | phishing      |
| "Hey, are we still on for lunch?"   | ham        | -             |

---

## 🛠️ Tech Stack

* **Frontend**: ReactJS, Framer Motion, Toastify
* **Backend**: Flask, Scikit-learn, NLTK
* **Model**: Multinomial Naive Bayes / Any trained classifier
* **Deployment**: Localhost (can be dockerized or hosted)

---

## ⚠️ Troubleshooting

* Backend CORS issues? Install Flask-CORS:

```bash
pip install flask-cors
```

(Ensure it's imported and used in `app.py`)

* Frontend can't connect? Confirm backend runs on `http://localhost:5000` and not another port.

---

## ✨ Future Improvements

* Use deep learning (e.g., BERT) for better classification
* Add voice input for message
* Export prediction history
* Deploy on AWS/GCP/Vercel

---

## 👨‍💻 Author

* **Name**: Prashanth Uppar
* **Institution**: KLE Tech Dr. MSSCET Belagavi
* **Role**: Developer, ML Integrator

---

Let me know if you want a version of this as a downloadable file, or help generating `spam_detection_train.py` if not already present.
