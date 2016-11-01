/**
 * Created by gen on 2016-10-31.
 */

import alt from '../alt';
import EmployeeActions from '../actions/EmployeeActions';
import {assign, contains} from 'underscore';

class EmployeeStore{

    constructor(){
        this.bindActions(EmployeeActions);
        this.name = '';
        this.description = '';
        this.id = 0;
        this.icon = '';
    }

    onGetEmployeeSuccess(data){
        assign(this, data);

    }

    onGetEmployeeFail(data){
        toastr.error(data.responseJSON.message);
    }

}

export default alt.createStore(EmployeeStore);