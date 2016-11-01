/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Group from './components/Group';
import Employee from './components/Employee'
import EmpList from './components/EmpList'

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/group' component={Group} />
        <Route path='/employees' component={EmpList} />
        <Route path='/employees/:id' component= {Employee}/>
    </Route>
);