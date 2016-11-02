/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';
import EmployeeListActions from '../actions/EmployeeListActions';

class EmployeeListStore{

    constructor(){
        this.bindActions(EmployeeListActions);
        this.employees = [];
    }

    onGetEmployeesSuccess(data){
        this.employees = data;

    }

    onGetEmployeesFail(data){
        toastr.error(data.responseJSON.message);
    }

}

export default alt.createStore(EmployeeListStore);