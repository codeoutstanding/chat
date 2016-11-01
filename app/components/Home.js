/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className='alert alert-info'>
                <ul id="message"></ul>
                <form>
                    <input autocomplete="off"/><button>Send</button>
                </form>
            </div>
        );
    }
}

export default Home;