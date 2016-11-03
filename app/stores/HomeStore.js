/**
 * Created by gen on 2016-11-03.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {assign, contains} from 'underscore';

class HomeStore{

    constructor(){
        this.bindActions(HomeActions);
        this.message = '';
        this.messageValidationState = '';
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

}

export default alt.createStore(HomeStore);