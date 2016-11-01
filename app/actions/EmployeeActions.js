/**
 * Created by gen on 2016-10-31.
 */
import alt from '../alt'

class EmployeeActions{

    /**
     * register actions
     */
    constructor(){
        this.generateActions(
            'getEmployeeSuccess',
            'getEmployeeFail'
        );
    }

    /**
     * asynchronous call functions
     * @param id
     */
    getEmployee(id){
        $.ajax({url: '/api/employees/'+id}).done((data) => {
            this.actions.getEmployeeSuccess(data);

        }).fail((jqXhr) => {
            this.actions.getEmployeeFail(jqXhr);

        });
    }
}

export default alt.createActions(EmployeeActions);

