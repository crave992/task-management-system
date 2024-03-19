import React, { useState, useEffect, ChangeEvent } from 'react';
import { Task, TaskStatus } from '@/interfaces/Task';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ImageUploader from '@/components/uploaders/ImageUploader'; // Assuming the ImageUploader component is in the same directory

interface EditTaskProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ open, onClose, task, onUpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task || {
    title: '',
    description: '',
    image: '',
    status: TaskStatus.Todo,
    due_date: new Date().toISOString().split('T')[0], // Default due date to today
  });

  useEffect(() => {
    // Update updatedTask whenever task prop changes
    setUpdatedTask(task || {
      title: '',
      description: '',
      image: '',
      status: TaskStatus.Todo,
      due_date: new Date().toISOString().split('T')[0], // Default due date to today
    });
  }, [task]);

  const handleChange = (e: any | string) => {
    if (typeof e === 'string') {
      // If the change is from ImageUploader
      setUpdatedTask(prevTask => ({
        ...prevTask,
        image: e,
      }));
    } else {
      // If the change is from TextField or Select
      const event = e as any;
      if ('target' in event) {
        const { name, value } = event.target;
        setUpdatedTask(prevTask => ({
          ...prevTask,
          [name]: value,
        }));
      } else {
        // If the change is from Select component
        const selectEvent = event as SelectChangeEvent<TaskStatus>;
        setUpdatedTask(prevTask => ({
          ...prevTask,
          status: selectEvent.target.value as TaskStatus,
        }));
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask(updatedTask);
    onClose(); // Close the dialog after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={updatedTask.title || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <ImageUploader onImageUpload={handleChange} />
          <Select
            fullWidth
            label="Status"
            name="status"
            value={updatedTask.status}
            onChange={handleChange}
            variant="outlined"
          >
            {Object.values(TaskStatus).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            name="due_date"
            value={updatedTask.due_date ? new Date(updatedTask.due_date).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
          Update Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTask;
