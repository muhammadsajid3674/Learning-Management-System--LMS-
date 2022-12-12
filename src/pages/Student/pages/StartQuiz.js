import { useState, useEffect } from 'react';
import { Box, Chip, Grid, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router-dom';
import React from 'react'
import { FlashOnTwoTone } from '@mui/icons-material';

function Quiz() {

    const [indexNo, setIndexNo] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const location = useLocation()
    const quizDetails = location.state.item
    const questionsArr = location.state.item.quizQues

    const correctAns = (val, ans) => {
        if (val === ans) {
            setScore(score + 10)
            setIndexNo(indexNo + 1)
        }
        else if (val !== ans) {
            setIndexNo(indexNo + 1)
        }
    }

    // Timer //
    const [minutes, setMinutes] = useState(quizDetails.duration);
    const [seconds, setSeconds] = useState(59);
    let timer;
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds - 1)
            if (seconds === 0) {
                setMinutes(minutes - 1)
                setSeconds(59)
            }
        }, 1000);
        if (indexNo == questionsArr.length || minutes === 0 && seconds === 0) {
            clearInterval(timer)
            setResult(true)
        }
        return () => clearInterval(timer)
    })
    // Timer //

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' minHeight="80vh">
                <Grid item xs={10} md={8}>
                    <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px', height: 'auto' }}>
                        <Box className='d-flex align-items-center justify-content-between border-bottom mb-3'>
                            <Typography variant='span' className='fs-3 fw-bold'>{quizDetails.quizName}</Typography>
                            <Typography variant='h4'>{minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds}</Typography>
                            <Typography variant='span'><EmojiEventsIcon />{quizDetails.totalMarks}</Typography>
                        </Box>
                        {result || indexNo == questionsArr.length ? (
                            <Grid container justifyContent='center' alignItems='center' minHeight="30vh">
                                <Grid item>
                                    <Typography variant='h4'>Thank you for attempting the quiz.</Typography>
                                    <Typography textAlign='center' variant='h6'>Your score is {score}</Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <Typography variant="h4">{questionsArr[indexNo].question}</Typography>
                                    <Typography sx={{ fontWeight: 900, color: '#0c4b74' }} variant="subtitle1">Question {indexNo} of {questionsArr.length}</Typography>
                                </Grid>
                                <Grid item md={8} >
                                    {/* <Chip
                                            onClick={() => correctAns(elem, questionsArr[indexNo].correctAns)}
                                            color='primary'
                                            label={elem}
                                            sx={{ width: '150px', height: '40px', borderRadius: '5px' }}
                                        /> */}
                                    <ul className="list-group list-group-flush list-group-numbered">
                                        {questionsArr[indexNo].option.map((elem, ind) => (
                                            <li className="list-group-item customLi" key={ind} onClick={() => correctAns(elem, questionsArr[indexNo].correctAns)}>{elem}</li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Grid>
            </Grid >

        </>
    )
}

export default Quiz 