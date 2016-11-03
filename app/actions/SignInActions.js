/**
 * Created by gen on 2016-10-31.
 */
import alt from '../alt'

class SignInActions{

    /**
     * register actions
     */
    constructor(){
        this.generateActions(
            'getSignInSuccess',
            'getSignInFail',
            'updateName',
            'invalidName'
        );
    }

    /**
     * asynchronous call functions
     * @param groupId
     * @param userName
     */
    getSignIn(groupId, userName){
        console.log('company>'+groupId+ ' user:'+userName);
        $.ajax({
            type: 'POST',
            url: '/api/signIn',
            data: {group: groupId, userName: userName}
        }).done((data) => {
            this.actions.getSignInSuccess(data);
        }).fail((jqxhr) => {
            this.actions.getSignInFail(jqxhr.responseJSON.message);
        });
    }
}

export default alt.createActions(SignInActions);

