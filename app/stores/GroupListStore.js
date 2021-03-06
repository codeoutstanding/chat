/**
 * Created by gen on 2016-11-01.
 */
import alt from '../alt';
import GroupListActions from '../actions/GroupListActions';

class GroupListStore{

    constructor(){
        this.bindActions(GroupListActions);
        this.groups = [];
        this.group = {groupName: 'GroupName'};
    }

    onGetGroupsSuccess(data){
        this.groups = data;

    }

    onGetGroupsFail(data){
        toastr.error(data.responseJSON.message);
    }

    onSelectedGroup(group){
        console.log(group);
        this.group = group;
    }

}

export default alt.createStore(GroupListStore);