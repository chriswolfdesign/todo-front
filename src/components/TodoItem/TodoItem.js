import "./TodoItem.css";

import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.checkboxClicked = this.checkboxClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  state = {
    completed: this.props.completed,
    body: this.props.body,
  }

  checkboxClicked() {
    let body = {
      id: this.props.id,
      completed: !this.state.completed
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open("UPDATE", "http://localhost:8000/todo", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(body));
    window.location.reload();
  }

  deleteClicked() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:8000/deleteItem?id=${this.props.id}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    window.location.reload();
  }

  render() {
    let classes;

    if (this.state.completed) {
      classes = "TodoItem CompletedItem";
    } else {
      classes = "TodoItem";
    }

    return (
      <div className={classes}>
        <input type="checkbox" className="TodoItemCheckbox" checked={this.state.completed} onChange={this.checkboxClicked} />
        {this.state.body}
        <button className="TodoDeleteButton" onClick={this.deleteClicked}>X</button>
      </div>
    )
  }
}
