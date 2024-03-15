import React, { useEffect, useState } from 'react';
import AuthGuard from '@/components/guards/AuthGuard';
import MainLayout from '@/components/layouts/MainLayout';
import CreateTaskForm from '@/components/forms/CreateTask';
import { Button, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TableFooter, TablePagination } from '@mui/material';
import FormDialog from '@/components/dialogs/FormDialog';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderBy, setOrderBy] = useState('created_at'); // Default orderBy to 'created_at'
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch tasks initially when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      let userId = null;
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        userId = parsedUser.user_id;
      }
      // Fetch tasks using the userId
      const response = await fetch(`/api/tasks/${userId}`);
      const data = await response.json();
      setTasks(data.tasks || []); // Initialize tasks
    };
    fetchTasks();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateTask = async (newTask: any) => {
    try {
      // Create the new task
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        // If task creation is successful, fetch the updated list of tasks from the API
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser.user_id;
          
          const tasksResponse = await fetch(`/api/tasks/${userId}`);
          const tasksData = await tasksResponse.json();
          setTasks(tasksData.tasks || []); // Update tasks state with the updated list
        }
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleRemoveTask = async (taskId: string) => {
    try {
      // Soft delete the task
      const response = await fetch(`/api/tasks/remove/${taskId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // If removal is successful, fetch the updated list of tasks from the API
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser.user_id;
          
          const tasksResponse = await fetch(`/api/tasks/${userId}`);
          const tasksData = await tasksResponse.json();
          setTasks(tasksData.tasks || []); // Update tasks state with the updated list
        }
      } else {
        console.error('Failed to remove task');
      }
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    let comparison = 0;
    if (a[orderBy] > b[orderBy]) {
      comparison = 1;
    } else if (a[orderBy] < b[orderBy]) {
      comparison = -1;
    }
    return order === 'asc' ? comparison : -comparison;
  });

  return (
    <AuthGuard>
      <MainLayout>
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4 px-2">
            <Typography variant="h1" align="center" gutterBottom>
              Task Page
            </Typography>
            <Button onClick={handleOpenDialog} variant="outlined" color="primary">
              Create Task
            </Button>
          </div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'task_id'}
                      direction={orderBy === 'task_id' ? order : 'asc'}
                      onClick={() => handleSort('task_id')}
                    >
                      Task ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'title'}
                      direction={orderBy === 'title' ? order : 'asc'}
                      onClick={() => handleSort('title')}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'description'}
                      direction={orderBy === 'description' ? order : 'asc'}
                      onClick={() => handleSort('description')}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'due_date'}
                      direction={orderBy === 'due_date' ? order : 'asc'}
                      onClick={() => handleSort('due_date')}
                    >
                      Due Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'created_at'} // Add sorting for created_at
                      direction={orderBy === 'created_at' ? order : 'asc'}
                      onClick={() => handleSort('created_at')}
                    >
                      Created At
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Action</TableCell> {/* Add column for Action */}
                  {/* Add more table headers if needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                  <TableRow key={task.task_id}>
                    <TableCell>{task.task_id}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{formatDate(task.due_date)}</TableCell> {/* Format due_date */}
                    <TableCell>{formatDate(task.created_at)}</TableCell> {/* Format created_at */}
                    <TableCell>
                      <Button variant="outlined" color="error" onClick={() => handleRemoveTask(task.task_id)}>
                        Remove
                      </Button>
                    </TableCell>
                    {/* Add more table cells for additional task properties */}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 25]}
                    colSpan={7} // Adjust colSpan for the number of columns
                    count={tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </div>
        <FormDialog open={openDialog} onClose={handleCloseDialog} title="Create Task">
          <CreateTaskForm onCreateTask={handleCreateTask} />
        </FormDialog>
      </MainLayout>
    </AuthGuard>
  );
};

export default TasksPage;
