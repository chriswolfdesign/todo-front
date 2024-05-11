import { Grid, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem(props) {
  const strikeThroughStyle = {
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
      onClick={toggleTodoCompletion}
    >
      <Grid container>
        <DeleteIcon
          sx={{ color: "red", marginRight: 2 }}
          onClick={deleteTodo}
        />
        <Typography sx={props.todo.completed ? strikeThroughStyle : {}}>
          {props.todo.text}
        </Typography>
      </Grid>
    </Paper>
  );
}

export default TodoItem;
