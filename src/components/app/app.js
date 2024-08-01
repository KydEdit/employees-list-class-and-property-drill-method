import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import { getDataFromDatabase, saveDataToDatabase } from '../../localStorage';
import Spinner from '../spinner-app/spinner';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Leon K.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Chris R.', salary: 3000, increase: false, rise: true, id: 2},
                {name: 'Ada W.', salary: 5000, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after]
            
            // Два способа изменения массива не нарушая иммутабельность

            return {    // newArr
                data: data.filter(item => item.id !== id)
            }
        })
    }

    componentDidMount() {
        this.loadDataFromDatabase();
    }
    
    async loadDataFromDatabase() {
        try {
            const savedData = await getDataFromDatabase('employeesData');
            if (savedData) {
            this.setState({ data: savedData });
            }
        } catch (error) {
            console.error('Error loading data from database:', error);
        }
    }
    
    saveDataToDatabase(data) {
        try {
            saveDataToDatabase('employeesData', data);
        } catch (error) {
            console.error('Error saving data to database:', error);
        }
    }

    // componentDidUpdate() {
    //     saveDataToLocalStorage('employeesData', this.state.data);
    // }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // onToggleIncrease = (id) => {
    //     // this.setState(({data}) => {
    //     //     const index = data.findIndex(elem => elem.id === id);
            
    //     //     const old = data[index];
    //     //     const newItem = {...old, increase: !old.increase};
    //     //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //     //     return {
    //     //         data: newArr
    //     //     }
    //     // })

    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }
    
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':                 // if(item.rise) return
                return items.filter(item => item.rise);
            case 'moreSalary1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        if (!data) {
            return <Spinner />;
        }

        return (
            <div className="app">
                <AppInfo 
                    employees={employees}
                    increased={increased}/>
        
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}


export default App;