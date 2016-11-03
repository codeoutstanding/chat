/**
 * Created by gen on 2016-10-31.
 */
import alt from '../alt'

class HomeActions{

    /**
     * register actions
     */
    constructor(){
        this.generateActions(
            'doSendMessage',
            'updateMessage',
            'invalidMessage'
        );
    }

    buildUpSession(){

    }

}

export default alt.createActions(HomeActions);

