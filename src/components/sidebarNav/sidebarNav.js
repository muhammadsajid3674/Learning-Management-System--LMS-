import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { MuiButton } from '../button/button';

function Sidebar(props) {

    const { header, dataSource } = props

    const navigate = useNavigate()
    const exitToForm = () => {
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position: 'fixed' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a className="text-decoration-none" style={{ color: 'inherit' }}>
                        {header}
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {dataSource.map((e, i) => {
                            return <NavLink key={i} exact='true' to={e.to} activeclassname="activeClicked">
                                <CDBSidebarMenuItem icon={e.icon}>{e.name}</CDBSidebarMenuItem>
                            </NavLink>
                        })}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        <MuiButton
                        variant="contained"
                        label="Log out"
                        onClick={exitToForm}
                        />
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;