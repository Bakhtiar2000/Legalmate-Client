import React, { useContext } from 'react';
import ActiveLink from '../components/ActiveLink';
import { AuthContext } from '../providers/AuthProvider';

const NavItems = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <>
        {
            currentUser.role=== "client"?
            <>
                <li><ActiveLink to="/">Home</ActiveLink></li>
                <li><ActiveLink to="/attorneys">Find attorneys</ActiveLink></li>
                <li><ActiveLink to="/postACase">Post a Case</ActiveLink></li>
                <li><ActiveLink to="/messages">Messages</ActiveLink></li>
            </>:
            currentUser.role=== "attorney"?
            <>
                <li><ActiveLink to="/">Home</ActiveLink></li>
                <li><ActiveLink to="/findCases">Find cases</ActiveLink></li>
                <li><ActiveLink to="/messages">Messages</ActiveLink></li>
            </>:
            currentUser.role=== "admin"?
            <>
                <li><ActiveLink to="/">Home</ActiveLink></li>
                <li><ActiveLink to="/attorneys">Find attorneys</ActiveLink></li>
                <li><ActiveLink to="/allUsers">All users</ActiveLink></li>
                <li><ActiveLink to="/allPayments">All payments</ActiveLink></li>
            </>:

            <>
                <li><ActiveLink to="/">Home</ActiveLink></li>
                <li><ActiveLink to="/practiceAreas">Practice areas</ActiveLink></li>
                <li><ActiveLink to="/attorneys">Our attorneys</ActiveLink></li>
                <li><ActiveLink to="/aboutUs">About us</ActiveLink></li>
                <li><ActiveLink to="/contact">Contact</ActiveLink></li>
            </>

        }            
        </>
    );
};

export default NavItems;