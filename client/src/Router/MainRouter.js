import React , { Component } from 'react';
import { BrowserRouter , Switch , Route } from 'react-router-dom';
import FreightNoteCreator from '../Freights/Container/FreightNoteCreator';
import FreightNote from '../Freights/Container/FreightNote';
import AdminFrontPage from '../Admin/Container/AdminFrontpage';
import AdminSingleFreight from '../Admin/Container/AdminSingleFreight';
import EmployeeFrontPage from '../Employee/Container/EmployeeFrontpage';
import EmployeeOutloading from '../Employee/Container/EmployeeOutloading';
import EmployeeDelivery from '../Employee/Container/EmployeeDelivery';
import EmployeeTotalFreight from '../Employee/Container/EmployeeTotal';
import LoginPage from '../Login/Container/LoginPage';
import FrontPage from '../FrontPage/Container/FrontPage';

class MainRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={FrontPage} />
                    <Route path="/create-freight" component={FreightNoteCreator} />
                    <Route path="/print-freight-note" component={FreightNote} />
                    <Route exact path="/admin" component={AdminFrontPage} />
                    <Route path="/admin/:notenumber/:status" component={AdminSingleFreight} />
                    <Route exact path="/employee" component={EmployeeFrontPage} />
                    <Route path="/employee/outloading" component={EmployeeOutloading} />
                    <Route path="/employee/delivery" component={EmployeeDelivery} />
                    <Route path="/employee/totalfreights" component={EmployeeTotalFreight} />
                    <Route path="/login/:fail?" component={LoginPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default MainRouter;