/**
 * Created by gen on 2016-11-01.
 */
import React from 'react';
import AddEmployeeStore from  '../stores/AddEmployeeStore';
import AddEmployeeActions from '../actions/AddEmployeeActions';
/**
 * JSX can be used in if statements and for loops,
 * can be assigned to variables,
 * be accepted as arguments,
 * and return from functions.
 */
class AddEmployee extends React.Component{
    constructor(props){
        super(props);
        this.state = AddEmployeeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        AddEmployeeStore.listen(this.onChange);
    }

    componentWillUnmount(){
        AddEmployeeStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    handleSubmit(event){
        event.preventDefault();

        var name = this.state.name.trim();
        var description = this.state.description;
        var icon = this.state.icon;

        if(!name){
            AddEmployeeActions.invalidName();
            this.refs.nameTextField.focus();
        }else{
            AddEmployeeActions.addEmployee(name, description, icon);
        }

    }

    render(){
        return (<div className="container">
            <div className="row flipInX animated">
                <div className="col-sm-8">
                    <div className="panel panel-default">
                        <div className="panel-heading">Add Employee</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className={'form-group' + this.state.nameValidationState}>
                                    <label className="control-label">
                                        Employee Name
                                    </label>
                                    <input type="text" className="form-control" ref='nameTextField'
                                           value={this.state.name} onChange={AddEmployeeActions.updateName} autoFocus/>
                                    <span className="help-block">{this.state.helpBlock}</span>
                                </div>
                                <div className='form-group'>
                                    <label className="control-label">
                                        Employee Description
                                    </label>
                                    <input type="text" className="form-control"
                                           onChange={AddEmployeeActions.updateDescription} value={this.state.description}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}



export default AddEmployee;