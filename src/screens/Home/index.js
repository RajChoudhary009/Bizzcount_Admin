import React, { useEffect, useState } from 'react';
import './index.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';


const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <h>home</h>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;

