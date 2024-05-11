import React from "react";
import { Box } from "@mui/material";
import TodoItem from "./components/TodoItem";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.url = "http://127.0.0.1:3000/todos";
    this.refreshData = this.refreshData.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
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
      </Box>
    );
  }
}

export default App;
