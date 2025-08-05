'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import HighlightedText from '@/components/HighlightedText';
import Navbar from '@/components/Navbar';

export default function Account() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-md mx-auto p-4">
        <div className="mb-8">
          <HighlightedText text="ACCOUNT SETTINGS" className="mb-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
          
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
          
          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••"
            required
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="••••••"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-700 py-2 rounded text-2xl font-semibold hover:bg-yellow-500 transition-colors mt-6"
          >
            Update Account
          </button>
        </form>
      </div>
    </main>
  );
}
