// src/components/Profile.js
import React from 'react';

const Profile = ({ employee }) => {
  if (!employee) {
    return <p>Выберите сотрудника из списка</p>;
  }

  const { name, position, salary } = employee;

  return (
    <div>
      <h2>Профиль сотрудника: {name}</h2>
      <p>Должность: {position}</p>
      <p>Зарплата: {salary}</p>
      {/*Дополнительные поля профиля, если необходимо */}
    </div>
  );
};

export default Profile;
