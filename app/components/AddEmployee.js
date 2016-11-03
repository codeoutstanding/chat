/**
 * Created by gen on 2016-11-01.
 */
import React from 'react';
import AddEmployeeStore from  '../stores/AddEmployeeStore';
import AddEmployeeActions from '../actions/AddEmployeeActions';
import GroupListActions from '../actions/GroupListActions';
import GroupListStore from '../stores/GroupListStore';
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
        GroupListStore.listen(this.onChange);
        GroupListActions.getGroups();
    }

    componentWillUnmount(){
        AddEmployeeStore.unlisten(this.onChange);
        GroupListStore.unlisten(this.onChange);
    }

    /**
     * when state change, we change the component state. That will cause
     * component render again.
     * shouldComponentUpdate return true or false will impact the render.
     * @param state
     */
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
            AddEmployeeActions.addEmployee(GroupListStore.getState().group._id, name, description, icon);
        }
    }

    selectedGroup(group){
        GroupListActions.selectedGroup(group);
    }

    render(){
        var groups = GroupListStore.getState().groups;

        let dropMenus = groups.map((group, index) => {
            return (<li key={index}><a href="#" onClick={this.selectedGroup.bind(this, group)}>{group.groupName}</a></li>);
        });

        return (<div className="container">
            <div className="row flipInX animated">
                <div className="col-sm-8">
                    <div className="panel panel-default">
                        <div className="panel-heading">Add Employee</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <div className="dropdown">
                                        <button className="btn btn-default dropdown-toggle" type="button" id="groupName"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            {GroupListStore.getState().group.groupName} <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="groupName">
                                            {dropMenus}
                                        </ul>
                                    </div>
                                </div>
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