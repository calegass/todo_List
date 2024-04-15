import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import service from "../services/service";

export default function TodoHead({ updateTasks }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await service.searchTasks(text.trim() || "");
      console.log("Tarefas encontradas:", response);
      updateTasks(
        response
          ? Object.entries(response).map(([taskId, task]) => ({
              id: taskId,
              ...task,
            }))
          : []
      );
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleSearchWithoutClick = async (e) => {
    try {
      const response = await service.searchTasks(e || "");
      console.log("Tarefas encontradas:", response);
      updateTasks(
        response
          ? Object.keys(response).map((taskId) => ({
              id: taskId,
              ...response[taskId],
            }))
          : []
      );
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      if (error.response.status === 404) {
        updateTasks([]);
      }
    }
  };

  const handleAdd = async () => {
    try {
      if (!text.trim() || !date) {
        throw new Error("por favor, preencha todos os campos.");
      }
      await service.addTask(text.trim(), date);
      console.log("Nova tarefa adicionada:", text.trim(), date);
      setText("");
      setDate("");
      handleSearchWithoutClick("");
    } catch (error) {
      window.alert("Erro ao adicionar tarefa: " + error.message);
      console.error("Erro ao adicionar tarefa:", error.message);
    }
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    const searchText = e.target.value;
    setText(e.target.value);

    clearTimeout(searchTimeout);
    const newTimeout = setTimeout(() => {
      handleSearchWithoutClick(searchText);
    }, 500);
    setSearchTimeout(newTimeout);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Backspace") {
  //     const searchText = text.slice(0, -1);
  //     setText(searchText);

  //     clearTimeout(searchTimeout);
  //     const newTimeout = setTimeout(() => {
  //       handleSearchWithoutClick(searchText);
  //     }, 500);
  //     setSearchTimeout(newTimeout);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Descrição"
        variant="outlined"
        value={text}
        // onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleTextChange(e)}
        sx={{
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "black",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            "& fieldset": {
              borderColor: "#B2BAC2",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6F7E8C",
            },
          },
          "& .MuiInputBase-root": {
            color: "black",
          },
          marginRight: 1,
          width: 250,
        }}
      />
      <TextField
        label="Data"
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{}}
        sx={{
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "black",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            "& fieldset": {
              borderColor: "#B2BAC2",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6F7E8C",
            },
          },
          "& .MuiInputBase-root": {
            color: "black",
          },
          marginRight: 1,
          width: 180,
        }}
      />
      {/* <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton> */}
      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
