import React, { Component } from 'react';

import Form from './Form';
import TasksList from './TasksList';

import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: undefined,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;
    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;
    if (tasks !== prevState.tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { newTask, tasks, index } = this.state;

    if (tasks.includes(newTask) || newTask.trim().length < 10) {
      // eslint-disable-next-line no-alert
      window.alert('Your task must have at least 10 characters and cannot exists in the task list');
      return;
    }

    const tasksCopy = [...tasks];

    if (!index) {
      tasksCopy.push(newTask.trim());
    } else {
      tasksCopy.splice(index, 0, newTask);
    }
    this.setState({
      tasks: [...tasksCopy],
      newTask: '',
      index: undefined,
    });
  };

  editHandleClick = (e, index) => {
    const { newTask, tasks } = this.state;
    const task = tasks[index];
    const tasksCopy = [...tasks];

    if (newTask !== task && newTask) return;

    tasksCopy.splice(index, 1);

    this.setState({
      tasks: [...tasksCopy],
      newTask: task,
      index,
    });
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  removeHandleClick = (e, index) => {
    const { tasks } = this.state;
    const tasksCopy = [...tasks];

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to remove this task?')) {
      tasksCopy.splice(index, 1);

      this.setState({
        tasks: [...tasksCopy],
      });
    }
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1 className="main-title">Tasks List</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />

        <TasksList
          editHandleClick={this.editHandleClick}
          removeHandleClick={this.removeHandleClick}
          tasks={tasks}
        />

      </div>
    );
  }
}
