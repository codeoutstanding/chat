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
        this.socket.on('message', (data) => {
            var data = JSON.parse(data);
            console.log('======'+data.from + ' =='+data.to);
            var message = this.filterMessage(data);
            if(message){
                HomeActions.receivedMessage(message);
            }
        });
    }

    filterMessage(data){
        if(data.from === this.room){
            return data.message;
        }
        return null;
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