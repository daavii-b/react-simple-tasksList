import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './List.css';

export default function TasksList({ editHandleClick, removeHandleClick, tasks }) {
  return (
    <ul className="taskList">
      {tasks.map((task, index) => (
        <li key={task}>
          {task}
          <span>
            <FaEdit onClick={(e) => editHandleClick(e, index)} className="edit-task" />
            <FaWindowClose onClick={(e) => removeHandleClick(e, index)} className="remove-task" />
          </span>
        </li>
      ))}
    </ul>
  );
}

TasksList.propTypes = {
  editHandleClick: PropTypes.func.isRequired,
  removeHandleClick: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};
