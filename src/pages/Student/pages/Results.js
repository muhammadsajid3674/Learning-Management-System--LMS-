import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import CusDataTable from '../../../components/CusDataTable/CusDataTable';
import { FloatingSelect } from '../../../components/Dropdown/Dropdown';
import { getData } from '../../../config/firebaseMethods';

function Results() {

    const [isLoading, setLoading] = useState(true)
    const [courseName, setCourseName] = useState('');
    const [resultData, setResultData] = useState({});
    const [resultTableData, setResultTableData] = useState([]);

    let showResult = (e) => {
        setCourseName(e)
        let courseResult = resultData.find((x => x.course == e))
        setResultTableData([...courseResult.result])
    }

    const getResults = () => {
        return getData('Results')
            .then((res) => {
                let arr = res.filter((e, i) => e.isShowResult)
                setResultData([...arr]);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getResults()
    }, [])



    return (
        <>
            <Grid container justifyContent='center' minHeight="auto">
                <Grid item xs={10} md={10}>
                    <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item md={10}>
                                <Typography variant="p" className="display-3">Create Result</Typography>
                                <Grid container className='mt-2' alignItems='center' spacing={2}>
                                    <Grid item xs={10} md={6}>
                                        <FloatingSelect
                                            label='Course'
                                            labelId='course-float'
                                            name="course"
                                            onChange={(e) => showResult(e.target.value)}
                                            required={true}
                                            // error={error}
                                            nodeName='Courses'
                                            displayValue='courseName'
                                            fieldValue='courseName'
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {courseName ? (
                                <Grid item xs={12} md={12}>
                                    <Typography variant="p" className="display-3">Results List</Typography>
                                    <CusDataTable
                                        dataSource={resultTableData}
                                        colValue={[
                                            {
                                                key: 'name',
                                                name: 'Name'
                                            },
                                            {
                                                key: 'marks',
                                                name: 'Marks'
                                            },
                                            {
                                                key: 'rollNum',
                                                name: 'Roll Num'
                                            },
                                            {
                                                key: 'result',
                                                name: 'Result'
                                            },
                                        ]}
                                    />
                                </Grid>
                            ) : (
                                <table>
                                    <tbody>
                                        <tr className='table-light' scope='row'>
                                            {resultTableData && resultTableData.length > 0 ? resultTableData.map((x, i) => {
                                                return <td>Data Not Found</td>
                                            }) : null}
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default Results;