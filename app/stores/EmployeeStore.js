/**
 * Created by gen on 2016-10-31.
 */

import alt from '../alt';
import EmployeeActions from '../actions/EmployeeActions';
import {assign, contains} from 'underscore';

class EmployeeStore{

    constructor(){
        this.bindActions(EmployeeActions);
        this.employeeName = '';
        this.employeeDescription = '';
        this.employeeId = 0;
        this.employeeIcon = '';
    }

    onGetEmployeeSuccess(data){
        assign(this, data);
        console.log(data);

    }

    onGetEmployeeFail(data){
        toastr.error(data.responseJSON.message);
    }

}

export default alt.createStore(EmployeeStore);