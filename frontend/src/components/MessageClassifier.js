import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MessageClassifier.css";

const MessageClassifier = () => {
    const [message, setMessage] = useState("");
    const [label, setLabel] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState("/Ham.jpg");

    useEffect(() => {
        if (label) {
            const timer = setTimeout(() => {
                setMessage("");
                setLabel("");
                setCategory("");
                setBackgroundImage("/Ham.jpg");
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [label]);

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error("Please enter a message!");
            return;
        }

        setLoading(true);
        setBackgroundImage("");

        try {
            const res = await axios.post("http://localhost:5000/predict", {
                message,
            });

            const predictedLabel = res.data.label;
            const detectedCategory = res.data.category || "General/Uncategorized";

            setLabel(predictedLabel);
            setCategory(detectedCategory);

            setTimeout(() => {
                if (predictedLabel.toLowerCase() === "spam") {
                    setBackgroundImage("/Spam.jpg");
                } else {
                    setBackgroundImage("/Ham.jpg");
                }
                setLoading(false);
            }, 1000);

            toast.success(`Classified as: ${predictedLabel.toUpperCase()} (${detectedCategory})`);
        } catch (err) {
            console.error(err);
            toast.error("Error contacting server");
            setLoading(false);
        }
    };

    return (
        <div
            className={`container ${loading ? "loading-background" : ""}`}
            style={{
                backgroundImage: !loading && backgroundImage ? `url(${backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                transition: "background 0.8s ease-in-out, background-image 1s ease-in-out",
            }}
        >
            <motion.div
                className="classifier-box"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="title">🛡️ Spam / Ham Classifier</h1>

                <motion.textarea
                    className="message-box"
                    placeholder="🔍 Enter your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    disabled={loading}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="classify-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    🚀 {loading ? "Classifying..." : "Classify"}
                </motion.button>

                {label && !loading && (
                    <motion.div
                        className={`result ${label.toLowerCase()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        ✅ Result: <strong>{label.toUpperCase()}</strong>
                        <br />
                        🗂️ Category: <span className="category">{category}</span>
                    </motion.div>
                )}

                {loading && (
                    <img
                        src="/Spam_doll.gif"
                        alt="Loading..."
                        className="loading-gif"
                    />
                )}

                <ToastContainer />
            </motion.div>
        </div>
    );
};

export default MessageClassifier;
