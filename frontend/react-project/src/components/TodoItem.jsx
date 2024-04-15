import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TodoHead from "./TodoHead";
import service from "../services/service";

export default function TodoItem() {
  const [tasks, setTasks] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await service.searchTasks("");
      const tasksArray = response
        ? Object.entries(response).map(([taskId, task]) => ({
            id: taskId,
            ...task,
          }))
        : [];
      setTasks(tasksArray);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleToggle = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    const task = tasks.find((task) => task.id === taskId);
    if (task.done) {
      try {
        await service.markTaskUndone(taskId);
        // fetchTasks();
      } catch (error) {
        console.error("Erro ao marcar tarefa como não concluída:", error);
      }
    } else {
      try {
        await service.markTaskDone(taskId);
        // fetchTasks();
      } catch (error) {
        console.error("Erro ao marcar tarefa como concluída:", error);
      }
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditedDescription(task.description);
    setEditedDueDate(task.duedate);
    setEditDialogOpen(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await service.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleArchive = async (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      if (task && task.done) {
        await service.deleteTask(taskId);
        fetchTasks();
      } else {
        window.alert("A tarefa não está marcada como concluída.");
        console.log("A tarefa não está marcada como concluída.");
      }
    } catch (error) {
      console.error("Erro ao arquivar tarefa:", error);
    }
  };

  const handleCloseEditDialog = () => {
    setSelectedTask(null);
    setEditDialogOpen(false);
  };

  const handleSaveEditedTask = async () => {
    if (editedDescription.trim() === "" || editedDueDate.trim() === "") {
      window.alert("Por favor, preencha todos os campos.");
      return;
    } else {
      try {
        await service.updateTask(
          selectedTask.id,
          editedDescription,
          editedDueDate
        );
        fetchTasks();
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Erro ao salvar tarefa editada:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          maxWidth: "500px",
          backgroundColor: "#DEDEDE",
          padding: "15px",
          borderRadius: "15px",
        }}
      >
        <TodoHead updateTasks={updateTasks} />
        <List sx={{ width: "100%" }}>
          {tasks.map((task) => (
            <ListItem
              style={{
                backgroundColor: task.done ? "#ccc" : "#DEDEDE",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              key={task.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(task)}
                    style={{ marginRight: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(task.id)}
                    style={{ marginRight: "10px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="archive"
                    onClick={() => handleArchive(task.id)}
                  >
                    <ArchiveIcon />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(task.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    style={{ color: task.done ? "black" : "black" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.description}
                  secondary={
                    <span style={{ fontSize: "smaller" }}>
                      {formatDate(task.duedate)}
                    </span>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        PaperProps={{
          style: {
            backgroundColor: "#DEDEDE",
            padding: "15px",
            borderRadius: "15px",
            textAlign: "center",
          },
        }}
      >
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            margin="dense"
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#DEDEDE",
              color: "black",
              width: "80%",
            }}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            fullWidth
            margin="dense"
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#DEDEDE",
              color: "black",
              width: "40%",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditDialog}
            style={{
              color: "black",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveEditedTask}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
