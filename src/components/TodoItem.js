import { Typography } from "@mui/material";

function TodoItem(props) {
  return (
    <Typography>
      {props.todo.text}, {props.todo.completed ? "true" : "false"}
    </Typography>
  );
}

export default TodoItem;
