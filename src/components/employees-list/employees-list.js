import EmployeesListItem from '../employees-list-item/employees-list-item'

import './employees-list.css';

const sortDataBySalary = (data) => data.sort((a, b) => b.salary - a.salary);

const EmployeesList = ({data, onDelete, onToggleProp, onEmployeeClick}) => {
    const sortedData = sortDataBySalary(data);
							// (item, i)
    const elements = sortedData.map(item => {
		const {id, ...itemProps} = item;
		return (				// {i}	// name={item.name} salary={item.salary}	
			<EmployeesListItem 
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onEmployeeClick={() => onEmployeeClick(item)} // Добавляем обработчик клика по сотруднику
            />
		)
	});

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;