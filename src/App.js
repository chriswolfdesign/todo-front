import React from "react";
import { Box } from "@mui/material";
import TodoItem from "./components/TodoItem";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const url = "http://127.0.0.1:3000/todos";
    axios
      .get(url)
      .then((response) => this.setState({ data: response.data.todos }))
      .catch((err) => console.log(err));
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
          return <TodoItem todo={todo} key={todo._id} />;
        })}
      </Box>
    );
  }
}

export default App;
