import React from 'react';
import Linear from './Pages/linearregressionmodel.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/index.jsx';
import ForestPrediction from './Pages/Forestregression/index';
import Index2 from "./Pages/index2";
import LightGBMPrediction from './Pages/LightGBMPrediction/index.tsx';

// ✅ Dummy component
function ForestDummy() {
  return (
    <div style={{ padding: '2rem', color: 'white', backgroundColor: 'green' }}>
      <h1>Forest Dummy Component</h1>
      <p>This route is working correctly!</p>
    </div>
  );
}

export default function App() {
  console.log("App.js loaded");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linear" element={<Linear />} />
        <Route path="/forest"   element={<ForestPrediction />} />
        <Route path='/light-gbm' element={<LightGBMPrediction />} />
      </Routes>
    </Router>
  );
}
