import { Box, Button, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { MuiButton } from '../../../components/button/button'
import MuiSkeleton from '../../../components/SkeletonLoader/MuiSkeleton'
import { getData } from '../../../config/firebaseMethods'
import { useNavigate } from 'react-router-dom';

function SelectQuiz() {

  const [isLoading, setLoading] = useState(true)
  const [existedQuizzes, setQuizzes] = useState([])
  const navigate = useNavigate()

  const startQuiz = (e) => {
    navigate('startQuiz', {
      state: {
        item: e
      }
    })
  }

  const getQuizzes = () => {
    return getData('QuizQuestions')
      .then((res) => {
        setLoading(false)
        setQuizzes(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getQuizzes()
  }, [])


  return (
    <>
      <Grid container justifyContent='center' minHeight="auto">
        <Grid item xs={10} md={10}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography variant="p" className="display-4">Available Quizzes</Typography>
                  </Grid>
                  {isLoading ? (
                    <>
                      <Grid item md={4}>
                        <CardContent>
                          <MuiSkeleton />
                        </CardContent>
                      </Grid>
                      <Grid item md={4}>
                        <CardContent>
                          <MuiSkeleton />
                        </CardContent>
                      </Grid>
                      <Grid item md={4}>
                        <CardContent>
                          <MuiSkeleton />
                        </CardContent>
                      </Grid>
                    </>
                  ) : (
                    <>
                      {existedQuizzes && existedQuizzes.length > 0 ? existedQuizzes.map((e, i) => {
                        return <Grid key={i} item md={4}>
                          <Paper elevation={3} sx={{
                            backgroundColor: '#407ba7',
                            color: '#fff'
                          }}>
                            <CardContent>
                              <Typography variant="h4" component="div">
                                {e.courseName}
                              </Typography>
                              <Typography variant="h6" sx={{ mb: 1.5 }} color="text.secondary">
                                {e.quizName}
                              </Typography>
                              <Typography variant="body1">
                                Duration: {e.duration}
                              </Typography>
                              {/* <Typography variant="body1">
                              No of Questions:{e.quiz.length}
                            </Typography> */}
                              <Typography variant="body1">
                                Total Marks: {e.totalMarks}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <MuiButton
                                variant='outlined'
                                label='Start Quiz'
                                color="light"
                                size='small'
                                onClick={() => startQuiz(e)}
                              />
                            </CardActions>
                          </Paper>

                        </Grid>
                      }) : null}
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default SelectQuiz