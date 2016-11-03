/**
 * Created by gen on 2016-11-03.
 */
import React from 'react';
import SignInActions from '../actions/SignInActions';
import SignStore from '../stores/SignInStore';
import GroupListActions from '../actions/GroupListActions';
import GroupListStore from '../stores/GroupListStore';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = SignStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        GroupListStore.listen(this.onChange);
        SignStore.listen(this.onChange);
        GroupListActions.getGroups();
    }

    componentWillUnmount(){
        SignStore.unlisten(this.onChange);
        GroupListStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('handle submit');
        var name = this.state.employeeName.trim();
        if(!name){
            SignInActions.invalidName();
            this.refs.nameTextField.focus();
        }else{
            SignInActions.getSignIn(GroupListStore.getState().group._id, name);
        }
    }

    handleMessageSubmit(event){
        event.preventDefault();
        var message = this.state.message.trim();

        if(!message){
            SignInActions.invalidMessage();
            this.refs.messageTextField.focus();
        }else{
            //socket io send message
            this.state.socket.emit('user-message',  message);
        }
    }

    selectedGroup(group){
        GroupListActions.selectedGroup(group);
    }

    render() {
        var groups = GroupListStore.getState().groups;

        let dropMenus = groups.map((group, index) => {
            return (<li key={index}><a href="#" onClick={this.selectedGroup.bind(this, group)}>{group.groupName}</a></li>);
        });


        var messages = this.state.messages;
        let mesList = messages.map((message, index) => {
            return (<li key={index}>{message}</li>);
        });

        return (
            <div className="container">
                <div className="row flipInX animated">
                    <div className="col-sm-8">
                        <div className='panel panel-default'>
                            <div className="panel-heading">
                                Please Sign In
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <span className="help-block">{this.state.helpBlock}</span>
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
                                    <div className={"form-group"+ this.state.nameValidationState}>
                                        <label className="control-label">User name</label>
                                        <input className="form-control" type="text" ref="nameTextField"
                                               onChange={SignInActions.updateName} value={this.state.employeeName}/>
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                {this.state.employeeName}
                            </div>
                            <div className="panel-body">
                                <ul>
                                    {mesList}
                                </ul>
                                <div>
                                    <form onSubmit={this.handleMessageSubmit.bind(this)}>
                                        <div className={"form-group"+ this.state.messageValidationState}>
                                            <label className="control-label">
                                                Send Message
                                            </label>
                                            <input type="text" className="form-control" ref="messageTextField"
                                                   onChange={SignInActions.updateMessage} value={this.state.message}/>
                                        </div>
                                        <br/>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;