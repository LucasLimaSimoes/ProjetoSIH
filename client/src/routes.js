import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";

const Routes = () => {
   return(
       <BrowserRouter>
            <Route component = {Login}  path="/" exact/>
            <Route component = {Home}  path="/home"/>
       </BrowserRouter>
   );
}

export default Routes;