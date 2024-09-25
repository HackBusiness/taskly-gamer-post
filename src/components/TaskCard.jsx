import React from 'react';
import { CheckCircle, Edit2, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ post, onVerify, onEdit, onSend, onCancel }) => {
  const statusColors = {
    pending: 'bg-yellow-100',
    verified: 'bg-green-100',
    posted: 'bg-blue-100'
  };

  return (
    <motion.div
      className={`p-4 rounded-lg shadow-md ${statusColors[post.status]}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{post.originalContent.title}</h3>
        <span className="text-sm text-gray-500">{new Date(post.scheduledDateTime).toLocaleString()}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{post.originalContent.snippet}</p>
      <p className="text-sm text-gray-500 mb-2">By {post.originalContent.author}</p>
      <p className="text-sm mb-4">{post.customWriteup}</p>
      <div className="flex justify-between">
        <div className="space-x-2">
          <button onClick={onVerify} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            <CheckCircle size={16} />
          </button>
          <button onClick={onEdit} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Edit2 size={16} />
          </button>
          <button onClick={onSend} className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600">
            <Send size={16} />
          </button>
        </div>
        <button onClick={onCancel} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;