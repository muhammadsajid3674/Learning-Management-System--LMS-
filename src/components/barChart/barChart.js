import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChatJS } from 'chart.js/auto';

function BarChart({ charData }) {
    return (
        <>
            <div style={{ width: 450 }}>
                <Bar data={charData}></Bar>
            </div>
        </>
    )
}

export default BarChart