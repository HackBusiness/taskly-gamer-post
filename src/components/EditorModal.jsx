import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditorModal = ({ post, onSave, onClose }) => {
  const [editedWriteup, setEditedWriteup] = useState(post.customWriteup);

  const handleSave = () => {
    onSave({ ...post, customWriteup: editedWriteup });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg w-full max-w-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <div className="mb-4">
          <h3 className="font-semibold">{post.originalContent.title}</h3>
          <p className="text-sm text-gray-600">{post.originalContent.snippet}</p>
          <p className="text-sm text-gray-500">By {post.originalContent.author}</p>
        </div>
        <textarea
          className="w-full h-32 p-2 border rounded mb-4"
          value={editedWriteup}
          onChange={(e) => setEditedWriteup(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditorModal;