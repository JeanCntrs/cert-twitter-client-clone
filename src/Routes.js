import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/hoc/PrivateRoute';
import UnloggedRoute from './components/hoc/UnloggedRoute';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Users from './components/pages/Users';
import SignIn from './components/pages/SignIn';
import Error404 from './components/pages/Error404';

// Redux
/* import { Provider } from 'react-redux';
import store from './store'; */

const App = () => {
    return (
        <BrowserRouter>
            {/* <Provider store={store}> */}
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/users" component={Users} />
                <UnloggedRoute exact path="/sign-in" component={SignIn} />
                <Route path="*" component={Error404} />
            </Switch>
            {/* </Provider> */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    );
}

export default App;