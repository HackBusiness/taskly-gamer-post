import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import EditorModal from './EditorModal';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

const initialPosts = [
  {
    id: '1',
    originalContent: {
      title: 'The Future of AI in Business',
      snippet: 'Exploring how AI is reshaping various industries...',
      author: 'John Doe'
    },
    customWriteup: 'Fascinating insights on AI\'s impact. What are your thoughts on AI in your industry?',
    scheduledDateTime: '2023-04-15T10:00:00',
    status: 'pending'
  },
  {
    id: '2',
    originalContent: {
      title: 'Remote Work Trends in 2023',
      snippet: 'Analyzing the shift towards remote and hybrid work models...',
      author: 'Jane Smith'
    },
    customWriteup: 'Remote work is here to stay. How has your company adapted to this new normal?',
    scheduledDateTime: '2023-04-16T14:30:00',
    status: 'verified'
  },
];

const AutoPostingTool = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPosts(items);
  };

  const handleVerify = (post) => {
    setCurrentEditPost(post);
    setIsEditorOpen(true);
  };

  const handleEdit = (post) => {
    setCurrentEditPost(post);
    setIsEditorOpen(true);
  };

  const handleSend = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'posted' } : post
    ));
    toast.success('Post sent successfully!');
    setTimeout(() => {
      setPosts(posts.filter(post => post.id !== postId));
    }, 2000);
  };

  const handleCancel = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.info('Post cancelled');
  };

  const handleSaveEdit = (editedPost) => {
    setPosts(posts.map(post => 
      post.id === editedPost.id ? { ...post, ...editedPost, status: 'verified' } : post
    ));
    setIsEditorOpen(false);
    toast.success('Post updated successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Scheduled Posts</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="posts">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {posts.map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TaskCard
                          post={post}
                          onVerify={() => handleVerify(post)}
                          onEdit={() => handleEdit(post)}
                          onSend={() => handleSend(post.id)}
                          onCancel={() => handleCancel(post.id)}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No scheduled posts. Add some to get started!</p>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              <PlusCircle className="mr-2" size={20} />
              Add New Post
            </button>
          </div>
        )}
      </div>
      {isEditorOpen && (
        <EditorModal
          post={currentEditPost}
          onSave={handleSaveEdit}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
};

export default AutoPostingTool;
