const admin = require("firebase-admin"); // Firebase Admin SDK
const db = admin.database(); // Referência ao Realtime Database

// Função para adicionar uma nova tarefa
exports.addTask = (req, res) => {
  const { description, duedate } = req.body;

  if (!description || !duedate) { 
    return res
      .status(400)
      .send("Descrição ou data de vencimento são obrigatórias.");
  }

  const newTaskRef = db.ref("tasks").push();
  newTaskRef.set(
    {
      description: description,
      duedate: duedate,
      done: false,
      hide: false,
    },
    (error) => {
      if (error) {
        return res.status(500).send("Erro ao adicionar a tarefa.");
      } else {
        return res.status(200).send("Tarefa adicionada com sucesso.");
      }
    }
  );
};

// Função para atualizar uma tarefa existente
exports.updateTask = (req, res) => {
  const { taskId } = req.params;
  const { description, duedate } = req.body;

  if (!description && !duedate) {
    return res
      .status(400)
      .send("Descrição e data de vencimento são obrigatórias.");
  }

  const taskRef = db.ref("tasks").child(taskId);
  if (description) {
    taskRef.update(
      {
        description: description,
      },
      (error) => {
        if (error) {
          return res.status(500).send("Erro ao atualizar a tarefa.");
        } else {
          return res.status(200).send("Tarefa atualizada com sucesso.");
        }
      }
    );
  }
  if (duedate) {
    taskRef.update(
      {
        duedate: duedate,
      },
      (error) => {
        if (error) {
          return res.status(500).send("Erro ao atualizar a tarefa.");
        } else {
          return res.status(200).send("Tarefa atualizada com sucesso.");
        }
      }
    );
  } else {
    taskRef.update(
      {
        description: description,
        duedate: duedate,
      },
      (error) => {
        if (error) {
          return res.status(500).send("Erro ao atualizar a tarefa.");
        } else {
          return res.status(200).send("Tarefa atualizada com sucesso.");
        }
      }
    );
  }
};

// Função para pesquisar tarefas por descrição
exports.searchTasks = (req, res) => {
  let { query } = req.query;

  db.ref("tasks")
    .once("value")
    .then((snapshot) => {
      const tasks = snapshot.val();
      let tasksToReturn;

      // Convertendo a consulta para minúsculas para correspondência case-insensitive
      const lowerCaseQuery = query ? query.toLowerCase() : "";

      if (!query) {
        // Se o parâmetro query estiver vazio, retorna todas as tarefas
        tasksToReturn = tasks;
      } else {
        // Filtrar as tarefas para encontrar correspondências parciais e manter os IDs originais
        tasksToReturn = Object.entries(tasks).reduce((acc, [taskId, task]) => {
          const taskDescription = task.description.toLowerCase();
          if (taskDescription.includes(lowerCaseQuery)) {
            acc[taskId] = task;
          }
          return acc;
        }, {});
      }

      // tasksToReturn.sort((a, b) => a.duedate - b.duedate);

      if (Object.keys(tasksToReturn).length === 0) {
        return res
          .status(404)
          .send("Nenhuma tarefa encontrada com essa descrição.");
      } else {
        return res.status(200).json(tasksToReturn);
      }
    })
    .catch((error) => {
      return res.status(500).send("Erro ao pesquisar tarefas.");
    });
};

// Função para excluir uma tarefa existente
exports.deleteTask = (req, res) => {
  const { taskId } = req.params;

  const taskRef = db.ref("tasks").child(taskId);
  taskRef.update({ hide: true }, (error) => {
    if (error) {
      return res.status(500).send("Erro ao marcar a tarefa como concluída.");
    } else {
      return res.status(200).send("Tarefa marcada como concluída com sucesso.");
    }
  });
};

// Função para marcar uma tarefa como concluída
exports.markTaskDone = (req, res) => {
  const { taskId } = req.params;

  const taskRef = db.ref("tasks").child(taskId);
  taskRef.update({ done: true }, (error) => {
    if (error) {
      return res.status(500).send("Erro ao marcar a tarefa como concluída.");
    } else {
      return res.status(200).send("Tarefa marcada como concluída com sucesso.");
    }
  });
};

// Função para marcar uma tarefa como não concluída
exports.markTaskUndone = (req, res) => {
  const { taskId } = req.params;

  const taskRef = db.ref("tasks").child(taskId);
  taskRef.update({ done: false }, (error) => {
    if (error) {
      return res.status(500).send("Erro ao marcar a tarefa como não concluída.");
    } else {
      return res.status(200).send("Tarefa marcada como não concluída com sucesso.");
    }
  });
};

// Função para arquivar uma tarefa concluída
exports.archiveTask = (req, res) => {
  const { taskId } = req.params;

  const taskRef = db.ref("tasks").child(taskId);
  taskRef.update({ hide: true }, (error) => {
    if (error) {
      return res.status(500).send("Erro ao arquivar a tarefa.");
    } else {
      return res.status(200).send("Tarefa arquivada com sucesso.");
    }
  });
};
