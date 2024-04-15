// services/service.js
import axios from "axios";

const baseUrl = "http://localhost:3000/api"; // URL da API

const service = {
  // Função para adicionar uma nova tarefa
  addTask: async (description, duedate) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, {
        description,
        duedate,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Função para atualizar uma tarefa existente
  updateTask: async (taskId, description, duedate) => {
    try {
      const response = await axios.put(`${baseUrl}/update/${taskId}`, {
        description,
        duedate,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Função para pesquisar tarefas por descrição
  searchTasks: async (query) => {
    try {
      const response = await axios.get(`${baseUrl}/search?query=${query}`);
      const tasks = response.data;

      // Filtrar as tarefas para retornar apenas aquelas com hide: false
      const filteredTasks = Object.entries(tasks)
        .filter(([_, task]) => !task.hide)
        .reduce((acc, [taskId, task]) => {
          acc[taskId] = task;
          return acc;
        }, {});

      return filteredTasks;
    } catch (error) {
      throw error;
    }
  },
  // Função para excluir uma tarefa existente
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Função para marcar uma tarefa como concluída
  markTaskDone: async (taskId) => {
    try {
      const response = await axios.put(`${baseUrl}/markdone/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Função para marcar uma tarefa como não concluída
  markTaskUndone: async (taskId) => {
    try {
      const response = await axios.put(`${baseUrl}/markundone/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Função para arquivar uma tarefa concluída
  archiveTask: async (taskId) => {
    try {
      const response = await axios.put(`${baseUrl}/archive/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default service;
