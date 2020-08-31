import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/pages/SignIn';
import LoggedIn from './components/LoggedIn';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <PrivateRoute exact path="/" component={LoggedIn} />
                    <Route exact path="/sign-in" component={SignIn} />
                </Switch>
            </Provider>
        </BrowserRouter>
    );
}

export default App;