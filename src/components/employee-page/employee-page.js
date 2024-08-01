// src/components/Employee.js
import React from 'react';

const Employee = ({ employee, onEmployeeClick }) => {
  const { id, name, position } = employee;

  return (
    <div onClick={() => onEmployeeClick(id)}>
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

export default Employee;
