/**
 * Created by gen on 2016-10-30.
 */
import React from 'react';
import Router from 'react-router';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from './routes';


let history = createBrowserHistory();
ReactDom.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));