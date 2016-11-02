/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';

class AddEmployeeActions{

    constructor(){
        this.generateActions(
            'addEmployeeSuccess',
            'addEmployeeFail',
            'updateName',
            'invalidName',
            'updateDescription'
        );
    }


    /**
     * add employee to db
     * @param name
     * @param description
     * @param icon
     */
    addEmployee(name, description, icon){
        $.ajax({
            type: 'POST',
            url: '/api/employees',
            data: {name: name, description: description, icon: icon}
        }).done((data) => {
            this.actions.addEmployeeSuccess(data.message);
        }).fail((jqxhr) => {
            this.actions.addEmployeeFail(jqxhr.responseJSON.message);
        });
    }
}

export default alt.createActions(AddEmployeeActions);