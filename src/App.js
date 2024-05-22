import React from "react";
import {Box, Paper, TextField, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TodoItem from "./components/TodoItem";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.url = process.env.SERVER_URL || "http://127.0.0.1:8080/todos";
        this.refreshData = this.refreshData.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
        this.deleteTodoItem = this.deleteTodoItem.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.calculateCompletionPercentage = this.calculateCompletionPercentage.bind(this);

        this.state = {
            data: [],
        };
    }

    calculateCompletionPercentage() {
        if (this.state.data.length === 0) {
            return 0;
        }

        let numTodos = this.state.data.length;
        let completedTodos = this.state.data.filter(todo => todo.completed).length;

        return Math.floor((completedTodos / numTodos) * 100);
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
            .then((response) => this.setState({data: response.data.todos}))
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
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Box sx={{ width: "100%", mr: 1}}>
                        <LinearProgress variant="determinate" value={this.calculateCompletionPercentage()} />
                    </Box>
                    <Box xs={{ minWidth: 25}}>
                        <Typography variant="body2">{this.calculateCompletionPercentage()}%</Typography>
                    </Box>
                </Box>

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
                        paddingY: 1,
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
