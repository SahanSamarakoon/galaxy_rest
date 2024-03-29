/*
import {Fragment, useState} from "react";

import Header from './components/Layout/Header';
import Meals from "./components/Meal/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }
  return (
    <Fragment>
        <Header onShowCart={showCartHandler}/>
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <main>
            <Meals/>
        </main>
    </Fragment>
  );
}

export default App;
*/

import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/auth'>
                    <AuthPage />
                </Route>
                <Route path='/profile'>
                    <UserProfile />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;