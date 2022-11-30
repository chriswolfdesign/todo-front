import "./TodoTable.css";

import React from "react";

import { TodoItem } from "../TodoItem/TodoItem";

const URL = "http://localhost:8000/todos";

export class TodoTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    }

    this.submitTodoItem = this.submitTodoItem.bind(this);
  }

  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(json => {
        this.setState({data: json});
      })
  }

  submitTodoItem(event) {
    event.preventDefault();

    let payload = {
      body: event.target.newTodoItem.value,
      completed: false,
    }

    console.log(payload)

    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8000/createItem", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(payload));
    window.location.reload();
  }

  render() {
    if (this.state.data !== null) {
      let incompleteItems = this.state.data.filter(item => {return !item.completed});
      let completeItems = this.state.data.filter(item => {return item.completed});
      let items = incompleteItems.concat(completeItems);

      return (
        <div>
        {items.map(item => {
          return (
            <TodoItem key={item.id} id={item.id} body={item.body} completed={item.completed}/>
          )
        })}
        <form onSubmit={this.submitTodoItem}>
          <input placeholder="DO ALL THE THINGS" className="NewTodoInput" name="newTodoItem" type="text"/>
        </form>
        </div>
      )
    }
  }
}
