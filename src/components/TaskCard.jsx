import React from 'react';
import { CheckCircle, Edit2, Send, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ post, onVerify, onEdit, onSend, onCancel }) => {
  const statusColors = {
    pending: 'bg-yellow-100 border-yellow-300',
    verified: 'bg-green-100 border-green-300',
    posted: 'bg-blue-100 border-blue-300'
  };

  const statusIcons = {
    pending: <Clock className="text-yellow-500" size={16} />,
    verified: <CheckCircle className="text-green-500" size={16} />,
    posted: <Send className="text-blue-500" size={16} />
  };

  return (
    <motion.div
      className={`p-4 rounded-lg shadow-md ${statusColors[post.status]} border-2 transition-all duration-300`}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{post.originalContent.title}</h3>
        <div className="flex items-center space-x-2">
          {statusIcons[post.status]}
          <span className="text-sm text-gray-500 capitalize">{post.status}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{post.originalContent.snippet}</p>
      <p className="text-sm text-gray-500 mb-2">By {post.originalContent.author}</p>
      <p className="text-sm mb-4 text-indigo-700">{post.customWriteup}</p>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          {post.status !== 'posted' && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onVerify}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEdit}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Edit2 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSend}
                className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              >
                <Send size={16} />
              </motion.button>
            </>
          )}
        </div>
        {post.status !== 'posted' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </motion.button>
        )}
        <span className="text-sm text-gray-500">
          <Clock className="inline mr-1" size={14} />
          {new Date(post.scheduledDateTime).toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default TaskCard;
