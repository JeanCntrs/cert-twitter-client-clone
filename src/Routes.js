import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/hoc/PrivateRoute';
import UnloggedRoute from './components/hoc/UnloggedRoute';
import SignIn from './components/pages/SignIn';
import Home from './components/pages/Home';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <UnloggedRoute exact path="/sign-in" component={SignIn} />
                </Switch>
            </Provider>
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