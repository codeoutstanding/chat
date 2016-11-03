/**
 * Created by gen on 2016-10-31.
 */

import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import GroupListStore from '../stores/GroupListStore';
import GroupListActions from '../actions/GroupListActions';

class EmpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = GroupListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        GroupListStore.listen(this.onChange);
        GroupListActions.getGroups();
    }

    componentWillUnmount() {
        GroupListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            GroupListStore.getGroups();
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let grouplist = this.state.groups.map((group, index)=>{
            console.log("group=> "+ JSON.stringify(group));
            return (<div key={index} className='list-group-item animated fadeIn'>
                <div className='media'>
                    <span className='position pull-left'>{index + 1}</span>
                    <div className='pull-left thumb-lg'>
                        <Link to={'/groups/' + group.groupId}>
                            <img className='media-object'
                                 src={'http://image.eveonline.com/Character/1_128.jpg'}/>
                        </Link>
                    </div>
                    <div className='media-body'>
                        <h4 className='media-heading'>
                            <Link to={'/groups/' + group.groupId}>{group.groupName}</Link>
                        </h4>
                        <small>description: <strong>{group.groupDescription}</strong></small>
                        <br />
                    </div>
                </div>
            </div>);
        });

        return (<div className="container">
            <div className="list-group">
                {grouplist}
            </div>
        </div>);
    }
}

export default EmpList;