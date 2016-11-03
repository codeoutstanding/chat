/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt'

class GroupListActions{

    /**
     * register actions
     */
    constructor(){
        this.generateActions(
            'getGroupsSuccess',
            'getGroupsFail',
            'selectedGroup'
        );
    }

    /**
     * asynchronous call functions
     * @param id
     */
    getGroups(){
        $.ajax({url: '/api/groups'}).done((data) => {
            this.actions.getGroupsSuccess(data);

        }).fail((jqXhr) => {
            this.actions.getGroupsFail(jqXhr);

        });
    }
}

export default alt.createActions(GroupListActions);