/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';
import AddGroupActions from '../actions/AddGroupActions';

class AddGroupStore{
    constructor(){
        this.bindActions(AddGroupActions);
        this.name = '';
        this.icon = '';
        this.description = '';
        this.helpBlock = '';
        this.nameValidationState = '';
    }

    onAddGroupSuccess(successMessage) {
        this.nameValidationState = 'has-success';
        this.helpBlock = successMessage;
    }

    onAddGroupFail(errorMessage){
        this.nameValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }

    onUpdateName(event){
        this.name = event.target.value;
        this.helpBlock = '';
        this.nameValidationState = '';
    }

    onInvalidName(){
        this.nameValidationState = 'has-error';
        this.helpBlock = 'please enter a Group name';
    }

    onUpdateDescription(event){
        this.description =  event.target.value;
    }
}

export default alt.createStore(AddGroupStore);
