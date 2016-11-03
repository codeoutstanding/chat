/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Group from './components/Group';
import GroupList from './components/GroupList';
import Employee from './components/Employee';
import EmpList from './components/EmpList';
import AddEmployee from './components/AddEmployee';
import AddGroup from './components/AddGroup';
import SignIn from './components/SignIn';

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/groups' component={GroupList} />
        <Route path='/employees' component={EmpList} />
        <Route path='/employees/:id' component= {Employee}/>
        <Route path='/groups/:id' component= {Group}/>
        <Route path='/addEmployee' components={AddEmployee}/>
        <Route path='/addGroup' component={AddGroup}/>
        <Route path='/signIn' component={SignIn}/>
    </Route>
);