/**
 * Created by gen on 2016-11-01.
 */
import React from 'react';
import AddGroupStore from  '../stores/AddGroupStore';
import AddGroupActions from '../actions/AddGroupActions';
/**
 * JSX can be used in if statements and for loops,
 * can be assigned to variables,
 * be accepted as arguments,
 * and return from functions.
 */
class AddGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = AddGroupStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        AddGroupStore.listen(this.onChange);
    }

    componentWillUnmount(){
        AddGroupStore.unlisten(this.onChange);
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
            AddGroupActions.invalidName();
            this.refs.nameTextField.focus();
        }else{
            AddGroupActions.addGroup(name, description, icon);
        }

    }

    render(){
        return (<div className="container">
            <div className="row flipInX animated">
                <div className="col-sm-8">
                    <div className="panel panel-default">
                        <div className="panel-heading">Add Group</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className={'form-group' + this.state.nameValidationState}>
                                    <label className="control-label">
                                        Group Name
                                    </label>
                                    <input type="text" className="form-control" ref='nameTextField'
                                           value={this.state.name} onChange={AddGroupActions.updateName} autoFocus/>
                                    <span className="help-block">{this.state.helpBlock}</span>
                                </div>
                                <div className='form-group'>
                                    <label className="control-label">
                                        Group Description
                                    </label>
                                    <input type="text" className="form-control"
                                           onChange={AddGroupActions.updateDescription} value={this.state.description}/>
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

export default AddGroup;