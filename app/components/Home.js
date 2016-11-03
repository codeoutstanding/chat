/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount(){
        HomeStore.listen(this.onChange);
        HomeActions.getRooms();
    }

    componentWillUnmount(){
        HomeStore.unlisten(this.onChange);
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
        var message = this.state.message.trim();

        if(!message){
            HomeActions.invalidMessage();
            this.refs.messageTextField.focus();
        }else{
            //socket io send message
            this.state.socket.emit('client-message',  message);
        }
    }

    selectedRoom(room){
        console.log('view selected:'+ room);
        HomeActions.selectedRoom(room);
    }

    render() {
        var rooms = this.state.chatRooms;

        let dropMenus = rooms.map((room, index) => {
            return (<li key={index}><a href="#" onClick={this.selectedRoom.bind(this, room)}>{room}</a></li>);
        });

        var messages = this.state.messages;
        let mesList = messages.map((message, index) => {
            return (<li key={index}>{message}</li>);
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Chat with employee
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <span className="help-block">{this.state.helpBlock}</span>
                                    <div className="form-group">
                                        <div className="dropdown">
                                            <button className="btn btn-default dropdown-toggle" type="button" id="groupName"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                {this.state.room} <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="groupName">
                                                {dropMenus}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={"form-group"+ this.state.messageValidationState}>
                                        <label className="control-label">
                                            Send Message
                                        </label>
                                        <input type="text" className="form-control" ref="messageTextField"
                                               onChange={HomeActions.updateMessage} value={this.state.message}/>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;