/**
 * Created by gen on 2016-11-03.
 */
import alt from '../alt';
import SignInActions from '../actions/SignInActions';
import {assign, contains} from 'underscore';

class SignInStore{

    constructor(){
        this.bindActions(SignInActions);
        this._id = -1;
        this.employeeName = '';
        this.employeeDescription = '';
        this.employeeIcon = '';
        this.helpBlock = '';
        this.messages = [];
        this.message = '';
        this.to = '';
    }

    onGetSignInSuccess(data){
        assign(this, data);
        this.helpBlock = 'sign in success and initial socket success';
        this.nameValidationState = 'has-success';
        this.buildSession(data);
    }

    onGetSignInFail(data){
        toastr.error(data.responseJSON.message);
        this.nameValidationState = 'has-error';
    }


    onUpdateMessage(event){
        this.message = event.target.value;
        this.helpBlock = '';
        this.messageValidationState = '';
    }

    onInvalidMessage(){
        this.messageValidationState = 'has-error';
        this.helpBlock = 'please enter a message';
    }

    onReceivedMessage(message){
        this.messages.push(message);
    }

    onUpdateName(event){
        this.employeeName = event.target.value;
        this.helpBlock = '';
        this.nameValidationState = '';
    }

    onInvalidName(){
        this.nameValidationState = 'has-error';
        this.helpBlock = 'please enter a employee name';
    }

    buildSession(user){
        this.socket = io();
        this.socket.emit('user-message', user.employeeName);
        this.socket.on('message', (data) =>{
            var data = JSON.parse(data);
            console.log('======'+data.from + ' =='+data.to);
            var message = this.filterMessage(data);
            if(message){
                this.to = data.from;
                SignInActions.receivedMessage(message);
            }
        });
    }

    filterMessage(data){
        if(data.to === this.employeeName){
            return data.message;
        }
        return null;
    }
}

export default alt.createStore(SignInStore);