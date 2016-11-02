/**
 * Created by gen on 2016-10-31.
 */

import React from 'react';
import EmployeeStore from '../stores/EmployeeStore';
import EmployeeActions from '../actions/EmployeeActions';

class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state = EmployeeStore.getState();
        console.log('find employee'+ this.props.params.id+ this.state);
        // bind function create a new function, and pass this as the context.
        this.onChange = this.onChange.bind(this);
    }

    onChange(state){
        this.setState(state);
    }

    componentDidMount(){
        EmployeeStore.listen(this.onChange);
        EmployeeActions.getEmployee(this.props.params.id);
    }

    componentWillUnmount(){
        EmployeeStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps){
        if(prevProps.params.id !== this.props.params.id){
            EmployeeActions.getEmployee(this.props.params.id);
        }
    }

    render() {
        return (
            <div className='container'>
                <div className="panel panel-default">
                    <div className="panel-heading">
                       {this.state.employeeName}
                    </div>
                    <div className="panel-body">
                        {this.state.employeeDescription}
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;