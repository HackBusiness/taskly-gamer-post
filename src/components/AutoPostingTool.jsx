import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import EditorModal from './EditorModal';
import { toast } from 'sonner';

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
    // Simulate sending the post
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'posted' } : post
    ));
    
    // Show a success toast
    toast.success('Post sent successfully!');
    
    // Optionally, remove the post from the list after a delay
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">LinkedIn Auto-Posting Tool</h1>
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
