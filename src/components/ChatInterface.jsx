import React, { useState } from 'react';
import axios from 'axios';



export default function  HousePriceChat  () {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [features, setFeatures] = useState({
    status: 'for_sale',
    bed: 3,
    bath: 2,
    acre_lot: 0.5,
    city: 0,
    state: 0,
    zip_code: 90210,
    house_size: 1500,
    price_per_sqft: 200,
    total_rooms: 5,
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/predict', features);
      const prediction = response.data;

      const botMessage = `
🏠 Predicted Price: $${prediction.predictedValue.toFixed(2)}
📈 Confidence: ${(prediction.confidence * 100).toFixed(0)}%
🏘️ Comparable Properties:
- ${prediction.comparableProperties[0].location}: $${prediction.comparableProperties[0].value.toFixed(2)}
- ${prediction.comparableProperties[1].location}: $${prediction.comparableProperties[1].value.toFixed(2)}
      `;

      setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: '❌ Error getting prediction.' }]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-2">🏡 House Price Prediction Chat</h2>
      <div className="h-80 overflow-y-scroll border p-2 mb-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for prediction or info..."
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
