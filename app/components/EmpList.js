/**
 * Created by gen on 2016-10-31.
 */

import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';

class EmpList extends React.Component {
    constructor(props) {
        super(props);
        this.employees = this.getEmployees();
        console.log('employee: init employee');
        this.onChange = this.onChange.bind(this);
    }

    getEmployees(){
       var employees = [];
       for(var i=0 ; i< 9; i++){
           var employee = {
                id: i,
                name:"Zhangsan",
                description:"I am a recruiter",
                icon:"http://localhost:8080"
           };
           employees.push(employee);
       }
       return employees;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {

        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        var empList = [];
        console.log('employee:'+this.employees.length);
        for(var index=0; index<this.employees.length; index++){
            var employee = this.employees[index];
            empList.push(<div key={employee.id} className='list-group-item animated fadeIn'>
                <div className='media'>
                    <span className='position pull-left'>{index + 1}</span>
                    <div className='pull-left thumb-lg'>
                        <Link to={'/employees/' + employee.id}>
                            <img className='media-object'
                                 src={'http://image.eveonline.com/Character/1_128.jpg'}/>
                        </Link>
                    </div>
                    <div className='media-body'>
                        <h4 className='media-heading'>
                            <Link to={'/employees/' + employee.id}>{employee.name}</Link>
                        </h4>
                        <small>description: <strong>{employee.description}</strong></small>
                        <br />
                    </div>
                </div>
            </div>);
        }

        return (<div className="container">
            <div className="list-group">
                {empList}
            </div>
        </div>);
    }
}

export default EmpList;