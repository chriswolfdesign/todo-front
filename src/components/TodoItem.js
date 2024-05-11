import { Paper, Typography } from "@mui/material";

function TodoItem(props) {
  const strikeThroughStyle = {
    textDecoration: "line-through",
    color: "lightgray",
  };

  function toggleTodoCompletion() {
    console.log("Toggling todo item:", props.todo._id);
  }

  return (
    <Paper
      sx={{
        marginTop: 3,
        paddingY: 1,
        paddingLeft: 1,
      }}
      elevation={5}
      onClick={toggleTodoCompletion}
    >
      <Typography sx={props.todo.completed ? strikeThroughStyle : {}}>
        {props.todo.text}
      </Typography>
    </Paper>
  );
}

export default TodoItem;
