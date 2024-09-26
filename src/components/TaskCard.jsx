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
      className={`p-4 rounded-md border ${statusColors[post.status]} bg-card text-card-foreground shadow-sm`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{post.originalContent.title}</h3>
        <span className="text-sm text-muted-foreground">
          {post.scheduledDateTime ? new Date(post.scheduledDateTime).toLocaleString() : 'Not scheduled'}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{post.originalContent.snippet}</p>
      <p className="text-sm text-muted-foreground mb-2">By {post.originalContent.author}</p>
      <p className="text-sm mb-4">{post.customWriteup}</p>
      <div className="flex justify-between">
        <div className="space-x-2">
          {post.status === 'pending' && (
            <>
              <button onClick={onSchedule} className="p-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors">
                <Calendar size={16} />
              </button>
              <button onClick={onEdit} className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={onSend} className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Send size={16} />
              </button>
            </>
          )}
        </div>
        {post.status === 'pending' && (
          <button onClick={onCancel} className="p-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition-colors">
            <X size={16} />
          </button>
        )}
        {post.status === 'scheduled' && (
          <span className="text-sm font-semibold text-purple-500">Scheduled</span>
        )}
        {post.status === 'posted' && (
          <span className="text-sm font-semibold text-blue-500">Posted</span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
