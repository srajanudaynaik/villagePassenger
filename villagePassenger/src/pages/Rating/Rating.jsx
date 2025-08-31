import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Rating.css";

const predefinedTags = [
  "Polite Driver",
  "Clean Vehicle",
  "Safe Driving",
  "On-Time",
  "Excellent Navigation",
  "Friendly Service",
];

export default function Rating() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tip, setTip] = useState("");

  const toggleTag = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    console.log({ rating, comment, selectedTags, tip });
    alert("Review submitted! Redirecting…");
    navigate("/home"); // or any route you want
  };

  return (
    <div className="rating__page">
      <h1 className="rating__title">Rate & Review</h1>
      <p className="rating__subtitle">Feedback for quality improvement.</p>

      {/* Stars */}
      <div className="rating__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`rating__star ${star <= rating ? "rating__star--filled" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Tags */}
      <h3 className="rating__section">Select tags:</h3>
      <div className="rating__tags">
        {predefinedTags.map((tag) => (
          <button
            key={tag}
            className={`rating__tag ${selectedTags.includes(tag) ? "rating__tag--selected" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Comment */}
      <h3 className="rating__section">Comments:</h3>
      <textarea
        className="rating__textarea"
        placeholder="Leave additional feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Tip */}
      <h3 className="rating__section">Tip driver (USD):</h3>
      <input
        className="rating__tip"
        type="number"
        placeholder="0.00"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
      />

      {/* Submit */}
      <button className="rating__submit" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
}