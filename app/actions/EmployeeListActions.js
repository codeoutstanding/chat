/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt'

class EmployeeListActions{

    /**
     * register actions
     */
    constructor(){
        this.generateActions(
            'getEmployeesSuccess',
            'getEmployeesFail'
        );
    }

    /**
     * asynchronous call functions
     * @param id
     */
    getEmployees(){
        $.ajax({url: '/api/employees'}).done((data) => {
            this.actions.getEmployeesSuccess(data);

        }).fail((jqXhr) => {
            this.actions.getEmployeesFail(jqXhr);

        });
    }
}

export default alt.createActions(EmployeeListActions);