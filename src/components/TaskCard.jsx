import React from 'react';
import { Edit2, Send, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ post, onSchedule, onEdit, onSend, onCancel }) => {
  const statusColors = {
    pending: 'border-yellow-500',
    scheduled: 'border-purple-500',
    posted: 'border-blue-500'
  };

  return (
    <motion.div
      className={`p-4 rounded-none border-2 ${statusColors[post.status]} bg-black text-green-400`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{post.originalContent.title}</h3>
        <span className="text-sm text-green-300">
          {post.scheduledDateTime ? new Date(post.scheduledDateTime).toLocaleString() : 'Not scheduled'}
        </span>
      </div>
      <p className="text-sm text-green-300 mb-2">{post.originalContent.snippet}</p>
      <p className="text-sm text-green-300 mb-2">By {post.originalContent.author}</p>
      <p className="text-sm mb-4">{post.customWriteup}</p>
      <div className="flex justify-between">
        <div className="space-x-2">
          {post.status === 'pending' && (
            <>
              <button onClick={onSchedule} className="p-2 bg-purple-700 text-green-400 rounded-none hover:bg-purple-600 transition-colors">
                <Calendar size={16} />
              </button>
              <button onClick={onEdit} className="p-2 bg-blue-700 text-green-400 rounded-none hover:bg-blue-600 transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={onSend} className="p-2 bg-green-700 text-green-400 rounded-none hover:bg-green-600 transition-colors">
                <Send size={16} />
              </button>
            </>
          )}
        </div>
        {post.status === 'pending' && (
          <button onClick={onCancel} className="p-2 bg-red-700 text-green-400 rounded-none hover:bg-red-600 transition-colors">
            <X size={16} />
          </button>
        )}
        {post.status === 'scheduled' && (
          <span className="text-sm font-semibold text-purple-400">Scheduled</span>
        )}
        {post.status === 'posted' && (
          <span className="text-sm font-semibold text-blue-400">Posted</span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
