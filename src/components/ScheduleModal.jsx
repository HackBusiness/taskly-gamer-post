import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';

const ScheduleModal = ({ post, onSave, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(post.scheduledDateTime ? new Date(post.scheduledDateTime) : new Date());
  const [selectedTime, setSelectedTime] = useState(post.scheduledDateTime ? new Date(post.scheduledDateTime).toTimeString().slice(0, 5) : '12:00');

  const handleSave = () => {
    const scheduledDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    scheduledDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    onSave({ ...post, scheduledDateTime: scheduledDateTime.toISOString(), status: 'scheduled' });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg w-full max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">{post.status === 'scheduled' ? 'Reschedule Post' : 'Schedule Post'}</h2>
        <div className="mb-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="mb-4">
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            {post.status === 'scheduled' ? 'Reschedule' : 'Schedule'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScheduleModal;
