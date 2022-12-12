import React from 'react'
import { Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { Chart as ChatJS } from 'chart.js/auto';

export function PieChart({ charData }) {
    return (
        <>
            <Pie data={charData}></Pie>
        </>
    )
}
export function DoughnutChart({ charData }) {
    return (
        <>
            <Doughnut data={charData}></Doughnut>
        </>
    )
}
export function PolarAreaChart({ charData }) {
    return (
        <>
            <PolarArea data={charData}></PolarArea>
        </>
    )
};
export function RadarChart({ charData }) {
    return (
        <>
            <Radar data={charData}></Radar>
        </>
    )
};
