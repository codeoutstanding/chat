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
    }

    onGetSignInSuccess(data){
        assign(this, data);
        this.helpBlock = 'sign in success and initial socket success';
        this.nameValidationState = 'has-success';
    }

    onGetSignInFail(data){
        toastr.error(data.responseJSON.message);
        this.nameValidationState = 'has-error';
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

}

export default alt.createStore(SignInStore);