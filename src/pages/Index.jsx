import React from 'react';
import AutoPostingTool from '../components/AutoPostingTool';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-8">
          LinkedIn Auto-Posting Tool
        </h1>
        <AutoPostingTool />
      </div>
    </div>
  );
};

export default Index;
