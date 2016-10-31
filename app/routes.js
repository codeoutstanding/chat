/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
    </Route>
);