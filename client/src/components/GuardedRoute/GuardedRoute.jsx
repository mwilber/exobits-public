import React from 'react';
import { Route } from "react-router-dom";

import SetupInstructions from '../SetupInstructions/SetupInstructions';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            auth === true
                ? Component
                : <SetupInstructions />
        )} />
    );
}

export default GuardedRoute;