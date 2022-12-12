import { Box, Button, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import MuiSkeleton from '../../../components/SkeletonLoader/MuiSkeleton'
import { getData } from '../../../config/firebaseMethods'
import { useNavigate } from 'react-router-dom';

const Announcement = () => {

  const [isLoading, setLoading] = useState(true)
  const [existedAnnouncements, setAnnouncement] = useState([])

  const getAnnouncement = () => {
    return getData('FormControl')
      .then((res) => {
        setLoading(false)
        setAnnouncement(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAnnouncement()
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
                    <Typography variant="p" className="display-4">Course Announcement</Typography>
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
                      {existedAnnouncements && existedAnnouncements.length > 0 ? existedAnnouncements.map((e, i) => {
                        return <Grid key={i} item md={4}>
                          <Paper elevation={3} sx={{
                            backgroundColor: '#407ba7',
                            color: '#fff'
                          }}>
                            <CardContent>
                              <Typography variant="h4" component="h4">
                                {e.courseName}
                              </Typography>
                              <Typography variant="h6" sx={{ mb: 1.5 }} color="text.secondary">
                                {e.openInCities}
                              </Typography>
                              <Typography variant="h5" component="h5">Admission</Typography>
                              <Typography variant="body1">
                                <b>Starts From:</b> {e.dateOfAdmissionStart}
                              </Typography>
                              <Typography variant="body1">
                                <b>Ends On:</b> {e.dateOfAdmissionEnd}
                              </Typography>
                            </CardContent>
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

export default Announcement