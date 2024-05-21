import {Checkbox, Grid, Paper, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";

function TodoItem(props) {
    const strikeThroughStyle = {
        marginTop: 1,
        textDecoration: "line-through",
        color: "lightgray",
    };

    const [editable, setEditable] = useState(false);

    function toggleTodoCompletion() {
        props.updateTodoItem(props.todo._id, {
            completed: !props.todo.completed,
        });
    }

    function deleteTodo() {
        props.deleteTodoItem(props.todo._id);
    }

    function createEditableText() {
        if (!props.todo.completed) {
            setEditable(true);
        }
    }

    function keyPress(e) {
        if (e.keyCode === 13 && e.target.value !== "") {
            props.updateTodoItem(props.todo._id, {
                text: e.target.value
            });
            setEditable(false);
        }
    }

    function createTodoText() {
        if (editable) {
            return (
                <TextField
                    sx={{
                        paddingY: 1,
                        paddingX: 1,
                        width: "50%",
                        height: "10px"
                    }}
                    size="small"
                    label="Edit todo"
                    defaultValue={props.todo.text}
                    autoFocus
                    onKeyDown={keyPress}
                />
            )
        }
        return (
            <Typography
                sx={props.todo.completed ? strikeThroughStyle : {marginTop: 1}}
            >
                {props.todo.text}
            </Typography>
        )
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
                    sx={{cursor: "pointer", color: "red", marginTop: 1}}
                    onClick={deleteTodo}
                />
                <Checkbox
                    checked={props.todo.completed}
                    onClick={toggleTodoCompletion}
                />
                <EditIcon
                    color={props.todo.completed ? "disabled" : "primary"}
                    sx={{cursor: "pointer", marginTop: 1, marginRight: 1}}
                    onClick={createEditableText}
                />
                {createTodoText()}
            </Grid>
        </Paper>
    );
}

export default TodoItem;
