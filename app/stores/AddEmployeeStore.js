/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';
import AddEmployeeActions from '../actions/AddEmployeeActions';

class AddEmployeeStore{
    constructor(){
        this.bindActions(AddEmployeeActions);
        this.name = '';
        this.icon = '';
        this.description = '';
        this.helpBlock = '';
        this.nameValidationState = '';
    }

    onAddEmployeeSuccess(successMessage) {
        this.nameValidationState = 'has-success';
        this.helpBlock = successMessage;
    }

    onAddEmployeeFail(errorMessage){
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
        this.helpBlock = 'please enter a employee name';
    }

    onUpdateDescription(event){
        this.description =  event.target.value;
    }
}

export default alt.createStore(AddEmployeeStore);
