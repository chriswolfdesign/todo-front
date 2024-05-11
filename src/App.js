import React from "react";
import { Box, TextField, Paper } from "@mui/material";
import TodoItem from "./components/TodoItem";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.url = "http://127.0.0.1:3000/todos";
    this.refreshData = this.refreshData.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      data: [],
    };
  }

  updateTodoItem(id, data) {
    axios
      .put(`${this.url}/${id}`, data)
      .then(() => this.refreshData())
      .catch((err) => console.log(err));
  }

  deleteTodoItem(id) {
    axios
      .delete(`${this.url}/${id}`)
      .then(() => this.refreshData())
      .catch((err) => console.log(err));
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      const data = {
        text: e.target.value,
        completed: false,
      };

      axios
        .post(this.url, data)
        .then(() => this.refreshData())
        .catch((err) => console.log(err));

      // reset the text box
      e.target.value = "";
    }
  }

  refreshData() {
    axios
      .get(this.url)
      .then((response) => this.setState({ data: response.data.todos }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.refreshData();
  }

  render() {
    return (
      <Box
        height="85vh"
        marginY={3}
        marginX={2}
        display="flex"
        flexDirection="column"
        borderRadius={2}
        padding={3}
        sx={{
          backgroundColor: "white",
        }}
      >
        {this.state.data.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo._id}
              updateTodoItem={this.updateTodoItem}
              deleteTodoItem={this.deleteTodoItem}
            />
          );
        })}
        <Paper
          sx={{
            marginTop: 3,
            paddyingY: 1,
            paddingLeft: 1,
          }}
        >
          <TextField
            sx={{
              paddingY: 1,
              paddingX: 1,
              width: "98%",
            }}
            size="small"
            label="New todo"
            onKeyDown={this.keyPress}
          />
        </Paper>
      </Box>
    );
  }
}

export default App;
