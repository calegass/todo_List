const express = require("express"); // Framework web
const router = express.Router(); // Instância do roteador
const taskController = require("../controllers/taskController"); // Importa o controller

// Rota para inserir uma nova tarefa
router.post("/add", taskController.addTask);

// Rota para atualizar uma tarefa existente
router.put("/update/:taskId", taskController.updateTask);

// Rota para pesquisar tarefas por descrição
router.get("/search", taskController.searchTasks);

// Rota para excluir uma tarefa existente
router.delete("/delete/:taskId", taskController.deleteTask);

// Rota para marcar uma tarefa como concluída
router.put("/markdone/:taskId", taskController.markTaskDone);

// Rota para marcar uma tarefa como não concluída
router.put("/markundone/:taskId", taskController.markTaskUndone);

// Rota para arquivar uma tarefa concluída
router.put("/archive/:taskId", taskController.archiveTask);

module.exports = router;
