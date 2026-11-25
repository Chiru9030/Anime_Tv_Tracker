import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Analytics() {
    const [stats, setStats] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setStats('LOGIN_REQUIRED');
            return;
        }
        
        axios.get(`${API_URL}/api/users/me/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setStats(response.data);
        })
        .catch(error => {
            console.error('Error fetching analytics:', error);
            setStats('FAILED');
        });
    }, [API_URL, token]);

    useEffect(() => {
        if (stats && stats !== 'LOGIN_REQUIRED' && stats !== 'FAILED' && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); 
            }
            
            const data = {
                labels: ['Completed Shows', 'Watching Shows'],
                datasets: [{
                    data: [stats.totalCompleted, stats.totalWatching],
                    backgroundColor: ['#28a745', '#007bff'], 
                }]
            };

            chartInstance.current = new window.Chart(chartRef.current, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Watch Status Breakdown' }
                    }
                }
            });
        }
    }, [stats]);


    if (stats === 'LOGIN_REQUIRED') {
        return <p style={{color: 'red', padding: '20px'}}>You must be logged in to view your analytics dashboard. Please <Link to="/login">Log In</Link>.</p>;
    }
    if (stats === 'FAILED') {
        return <p style={{color: 'red', padding: '20px'}}>Failed to load analytics. Ensure your backend server is running and you are logged in.</p>;
    }
    if (!stats) {
        return <div style={{padding: '20px'}}>Loading analytics...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>📊 My Watch Analytics Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Total Episodes Watched</h3>
                    <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.totalEpisodesWatched}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Top Genre</h3>
                    <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.topGenre}</p>
                </div>
            </div>
            
            <div style={{ width: '100%', maxWidth: '500px', margin: '40px auto' }}>
                <h3>Current Status Breakdown (Data Visualization)</h3>
                <canvas ref={chartRef}></canvas> 
            </div>
        </div>
    );
}