import { Checkbox, Grid, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem(props) {
  const strikeThroughStyle = {
    marginTop: 1,
    textDecoration: "line-through",
    color: "lightgray",
  };

  function toggleTodoCompletion() {
    props.updateTodoItem(props.todo._id, {
      completed: !props.todo.completed,
    });
  }

  function deleteTodo() {
    props.deleteTodoItem(props.todo._id);
  }

  return (
    <Paper
      sx={{
        marginTop: 3,
        paddingY: 1,
        paddingLeft: 1,
      }}
      elevation={5}
    >
      <Grid container>
        <DeleteIcon
          sx={{ cursor: "pointer", color: "red", marginTop: 1 }}
          onClick={deleteTodo}
        />
        <Checkbox
          checked={props.todo.completed}
          onClick={toggleTodoCompletion}
        />
        <Typography
          sx={props.todo.completed ? strikeThroughStyle : { marginTop: 1 }}
        >
          {props.todo.text}
        </Typography>
      </Grid>
    </Paper>
  );
}

export default TodoItem;
