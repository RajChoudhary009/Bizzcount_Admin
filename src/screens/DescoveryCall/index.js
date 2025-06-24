import React, { useEffect, useState } from 'react';
import { SERVER_API_URL } from '../../server/server'
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import './index.css'; // Optional for styling

const DiscoveryCalls = () => {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${SERVER_API_URL}/api/discovery-calls`)
            .then((res) => {
                if (res.data.success && res.data.data) {
                    setCalls(res.data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching discovery calls:', err);
                setLoading(false);
            });
    }, []);

    // const downloadCSV = (data) => {
    //     const header = ['Full Name', 'Email', 'Phone', 'Company', 'Referral Source', 'Message', 'Date'];
    //     const rows = data.map(call => [
    //         `${call.firstName} ${call.lastName}`,
    //         call.email,
    //         call.phone,
    //         call.company,
    //         call.referralSource,
    //         call.message,
    //         new Date(call.createdAt).toLocaleString()
    //     ]);
    
    //     const csvContent = [header, ...rows]
    //         .map(e => e.map(cell => `"${cell}"`).join(','))
    //         .join('\n');
    
    //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    //     const url = URL.createObjectURL(blob);
    
    //     const link = document.createElement('a');
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', 'discovery_calls.csv');
    //     link.style.display = 'none';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const downloadCSV = (call) => {
        const header = ['Full Name', 'Email', 'Phone', 'Company', 'Referral Source', 'Message', 'Date'];
        const row = [
          `${call.firstName || ''} ${call.lastName || ''}`,
          call.email || '',
          call.phone || '',
          call.company || '',
          call.referralSource || '',
          call.message || '',
          new Date(call.createdAt).toLocaleString() || ''
        ];
      
        const csvContent = [header, row]
          .map(e => e.map(cell => `"${cell}"`).join(','))
          .join('\n');
      
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `discovery_call_${call.firstName || 'entry'}.csv`);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };   

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">
                    <div className="table-container">
                        <h2>Discovery Calls</h2>
                        <table className="discovery-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>Referral Source</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calls.map((call, index) => (
                                    <tr key={call.id}>
                                        <td>{index + 1}</td>
                                        <td>{call.firstName} {call.lastName}</td>
                                        <td>{call.email}</td>
                                        <td>{call.phone}</td>
                                        <td>{call.company}</td>
                                        <td>{call.referralSource}</td>
                                        <td>{call.message}</td>
                                        <td>{new Date(call.createdAt).toLocaleString()}</td>
                                        <button onClick={() => downloadCSV(call)} style={{ marginBottom: '10px',  border: "none", background:"transparent"}}>
                                            Download CSV
                                        </button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DiscoveryCalls;
