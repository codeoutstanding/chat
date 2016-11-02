/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';

class AddGroupActions{

    constructor(){
        this.generateActions(
            'addGroupSuccess',
            'addGroupFail',
            'updateName',
            'invalidName',
            'updateDescription'
        );
    }


    /**
     * add Group to db
     * @param name
     * @param description
     * @param icon
     */
    addGroup(name, description, icon){
        $.ajax({
            type: 'POST',
            url: '/api/Groups',
            data: {name: name, description: description, icon: icon}
        }).done((data) => {
            this.actions.addGroupSuccess(data.message);
        }).fail((jqxhr) => {
            this.actions.addGroupFail(jqxhr.responseJSON.message);
        });
    }
}

export default alt.createActions(AddGroupActions);