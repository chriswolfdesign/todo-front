import React from "react";
import { Box } from "@mui/material";
import * as data from "./tmp-data.json";
import TodoItem from "./components/TodoItem";

class App extends React.Component {
  constructor() {
    super();
    this.state = data;
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
