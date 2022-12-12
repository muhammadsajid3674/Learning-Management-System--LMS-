import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import { MuiButton } from '../../../components/button/button';
import CusDataTable from '../../../components/CusDataTable/CusDataTable';
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable';
import { FloatingSelect } from '../../../components/Dropdown/Dropdown';
import MuiSwitch from '../../../components/Switch/MuiSwitch';
import { pushData } from '../../../config/firebaseMethods';

function CreateResult() {

    const [data, setData] = useState({});
    const [courseStatus, setCourseStatus] = useState(false);
    const [resultData, setResultData] = useState([
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC100",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC101",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC102",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC103",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC104",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC105",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC106",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC107",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC108",
            result: "Pass",
        },
        {
            name: "ABC",
            marks: 80,
            rollNum: "ABC109",
            result: "Pass",
        },
    ]);


    let submitForm = () => {
        data.isShowResult = courseStatus;
        data.result = resultData;
        console.log(data)
        return pushData(data, 'Results')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    };


    return (
        <>
            <Grid container justifyContent='center' minHeight="100vh">
                <Grid item xs={10} md={10}>
                    <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
                        <Grid item md={10}>
                            <Typography variant="p" className="display-3">Create Result</Typography>
                            <Grid container className='mt-2' alignItems='center' spacing={2}>
                                <Grid item xs={10} md={6}>
                                    <FloatingSelect
                                        label='Course'
                                        labelId='course-float'
                                        name="course"
                                        onChange={(e) => setData({ ...data, course: e.target.value })}
                                        required={true}
                                        // error={error}
                                       nodeName='Courses'
                                       displayValue='courseName'
                                       fieldValue='courseName'
                                    />
                                </Grid>
                                <Grid item  xs={10} md={1}>
                                    <MuiSwitch
                                        label='Course Status'
                                        onChange={(e) => setCourseStatus(e.target.checked)}
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    {/* {formSubmit ? (
                    <CircularProgress />
                  ) : ( */}
                                    <MuiButton
                                        color="custom"
                                        label='Submit'
                                        onClick={submitForm}
                                    />
                                    {/* )} */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography variant="p" className="display-3">Results List</Typography>
                                <MuiDataTable
                                dataSource={resultData}
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
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default CreateResult