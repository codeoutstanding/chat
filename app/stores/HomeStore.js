/**
 * Created by gen on 2016-11-03.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {assign, contains} from 'underscore';

class HomeStore{

    constructor(){
        this.bindActions(HomeActions);
        this.message = ''; //current send message
        this.chatRooms = [];
        this.messageValidationState = '';
        this.room = 'No room available';
        this.messages = [];
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

    onGetRoomsSuccess(data){
        this.chatRooms = data;
        this.messageValidationState = 'has-success';
        this.buildUpSession();
    }

    buildUpSession(){
        this.socket = io();
        this.socket.emit('client-message', 'hello I am client');
        this.socket.on('client-message', function (data) {
            //this.actions.receivedMessage(data);
        });
    }

    onGetRoomsFail(data){
        toastr.error(data.responseJSON.message);
        this.messageValidationState = 'has-error';
    }

    onReceivedMessage(message){
        this.messages.push(message);
    }

    onSelectedRoom(room){
        console.log('selected room :'+room);
        this.room = room;
    }

}

export default alt.createStore(HomeStore);