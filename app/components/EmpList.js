/**
 * Created by gen on 2016-10-31.
 */

import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import EmployeeListStore from '../stores/EmployeeListStore';
import EmployeeListActions from '../actions/EmployeeListActions';

class EmpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = EmployeeListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        EmployeeListStore.listen(this.onChange);
        EmployeeListActions.getEmployees();
    }

    componentWillUnmount() {
        EmployeeListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            EmployeeListActions.getEmployees();
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let emplist = this.state.employees.map((employee, index)=>{
            return (<div key={employee._id} className='list-group-item animated fadeIn'>
                <div className='media'>
                    <span className='position pull-left'>{index + 1}</span>
                    <div className='pull-left thumb-lg'>
                        <Link to={'/employees/' + employee._id}>
                            <img className='media-object'
                                 src={'http://image.eveonline.com/Character/1_128.jpg'}/>
                        </Link>
                    </div>
                    <div className='media-body'>
                        <h4 className='media-heading'>
                            <Link to={'/employees/' + employee._id}>{employee.employeeName}</Link>
                        </h4>
                        <h6>Company: {employee.group.groupName}</h6>
                        <small>description: <strong>{employee.employeeDescription}</strong></small>

                        <br />
                    </div>
                </div>
            </div>);
        });

        return (<div className="container">
            <div className="list-group">
                {emplist}
            </div>
        </div>);
    }
}

export default EmpList;