import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChatJS } from 'chart.js/auto';

function LineChart({ charData }) {
    return (
        <>
            <div style={{ width: 450 }}>
                <Line data={charData}></Line>
            </div>
        </>
    )
}

export default LineChart