// src/components/ReportForm.jsx
import React, { useState } from 'react';

const ReportForm = () => {
  const [marker, setMarker] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    image: null,
  });

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('category', formData.category);
    dataToSend.append('description', formData.description);
    dataToSend.append('lat', marker?.lat);
    dataToSend.append('lng', marker?.lng);
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    // TODO: use axios to send POST request
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Report Dangerous Location</h2>

      {/* Google Maps Embed OR Google Maps API */}
      <div className="mb-4">
        {/* Embed Google Map or custom map */}
        <p className="text-sm text-gray-500">Click on the map to select a location</p>
        {/* Google Maps Integration Here */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="dangerous_bend">Dangerous Bend</option>
          <option value="broken_bridge">Broken Bridge</option>
          <option value="poor_visibility">Poor Visibility</option>
        </select>

        <textarea
          placeholder="Description..."
          className="w-full border rounded p-2"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
