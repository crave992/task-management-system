import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Task, TaskStatus } from '@/interfaces/Task';
import ImageUploader from '@/components/uploaders/ImageUploader'; // Import the ImageUploader component

interface CreateTaskProps {
  onCreateTask: (newTask: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onCreateTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>(''); // State for image URL
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user ID from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserId(parsedUser.user_id);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newTask: Task = {
        task_id: '', // Leave empty for now, it will be generated on the server
        title,
        description,
        image,
        status: TaskStatus.Todo, // Default status is Todo
        deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null, // Change null to new Date() or leave it as null if allowed
        user_id: userId || '', // Ensure user_id is not null
        due_date: dueDate || new Date().toISOString(), // Change null to new Date() or leave it as null if allowed
      };

      // Call the onCreateTask function with the new task
      onCreateTask(newTask);

      // Reset form fields after successful task creation
      setTitle('');
      setDescription('');
      setImage('');
      setDueDate(null);
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error
    }
  };

  return (
    <Paper>
      <Typography variant="h2" align="center" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUploader onImageUpload={setImage} /> {/* Use the ImageUploader component */}
          </Grid>
          <Grid item xs={12}>
            <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={dueDate ? dueDate.split('T')[0] : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setDueDate(new Date(value).toISOString());
                  } else {
                    setDueDate(null);
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateTask;
