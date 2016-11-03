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
            'receivedMessage',
            'updateMessage',
            'invalidMessage',
            'getRoomsSuccess',
            'selectedRoom',
            'getRoomsFail'
        );
    }

    getRooms(){
        $.ajax({url: '/api/rooms/'}).done((data) => {
            this.actions.getRoomsSuccess(data);
        }).fail((jqXhr) => {
            this.actions.getRoomsFail(jqXhr);

        });
    }

}

export default alt.createActions(HomeActions);

