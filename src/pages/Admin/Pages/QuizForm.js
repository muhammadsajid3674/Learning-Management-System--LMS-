import { Delete, QuestionAnswer } from '@mui/icons-material'
import { Box, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MuiButton } from '../../../components/button/button'
import MuiCustomizedButtons from '../../../components/button/MuiCustomButtom'
import CusDataTable from '../../../components/CusDataTable/CusDataTable'
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable'
import { FloatingSelect } from '../../../components/Dropdown/Dropdown'
import { FloatingInput, MuiInput } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'

function Quiz() {

  const [isLoading, setLoading] = useState(true)
  const [formSubmit, setFormSubmit] = useState(false)
  const [questionForm, setQuestionForm] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [data, setData] = useState({})
  const [existedQues, setExistedQues] = useState({})

  const [option, setOption] = useState("")
  const [optionArr, setOptionArr] = useState([])
  const [quesModal, setQuesModal] = useState([])
  const [quesObj, setQuesObj] = useState({})
  const [correctAns, setCorrectAns] = useState({})


  const handleChange = (e) => {
    let newField = { [e.target.name]: e.target.value }
    setData({ ...data, ...newField })
  }

  const CreateQuiz = () => {
    setDisabled(true)
    setQuestionForm(true)
    console.log(data)
  }

  const addQuestion = () => {
    quesObj.option = optionArr
    quesObj.correctAns = correctAns
    setQuesModal([...quesModal, quesObj])
    setOptionArr([])
  }

  // Options
  const AddToOptionARR = () => {
    setOptionArr([...optionArr, option])
    setOption("")
  }

  let deleteItem = (id) => {
    let listI = optionArr.filter((value, index) => {
      return index !== id
    })
    setOptionArr(listI)
  }
  // Options

  const submitQuiz = () => {
    data.quizQues = quesModal
    console.log(data)
    setFormSubmit(true)
    alert('Do you want to Submit?')
    return pushData(data, 'QuizQuestions/')
      .then((res) => {
        setFormSubmit(false)
        console.log(res);
      })
      .catch((err) => {
        setFormSubmit(false)
        console.log(err);
      })
  }

  const getQuizQuestion = () => {
    return getData('QuizQuestions/')
      .then((res) => {
        console.log(res)
        setExistedQues(res);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      })
  }

  useEffect(() => {
    getQuizQuestion()
  }, [])


  return (
    <>
      <Grid container justifyContent='center' minHeight="100vh">
        <Grid item xs={12} md={10}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
            <Grid container spacing={5}>
              {/* /// Create Quiz /// */}
              <Grid item md={6}>
                <Typography variant="h3" className="pb-3">Quiz Form</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={6}>
                    <FloatingInput
                      label='Quiz Name'
                      labelId='quizName-float'
                      name='quizName'
                      placeholder='Quiz Name'
                      disabled={disabled}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={10} md={6}>
                    <FloatingSelect
                      label='Course Name'
                      labelId='courseName-float'
                      name='courseName'
                      onChange={(e) => handleChange(e)}
                      required={true}
                      disabled={disabled}
                      nodeName='Courses'
                      displayValue='courseName'
                      fieldValue='courseName'
                    // error={error}
                    />
                  </Grid>
                  <Grid item xs={10} md={6}>
                    <FloatingInput
                      label='Duration'
                      labelId='duration-float'
                      name='duration'
                      placeholder='Duration'
                      disabled={disabled}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={10} md={6}>
                    <FloatingInput
                      label='Total Marks'
                      labelId='totalMarks-float'
                      name='totalMarks'
                      placeholder='Total Marks'
                      disabled={disabled}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={10} md={6}>
                    <MuiButton
                      label="Create Quiz"
                      onClick={CreateQuiz}
                      color='custom'
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* /// Submit Questions /// */}
              {questionForm && < Grid item md={6}>
                <Typography variant="h3" className="pb-3">Add Questions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={12}>
                    <FloatingInput
                      label='Questions'
                      labelId='questions-float'
                      name='questions'
                      placeholder='Questions'
                      onChange={(e) => setQuesObj({ ...quesObj, question: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <FloatingInput
                      label='Options'
                      labelId='options-float'
                      name='options'
                      placeholder='Options'
                      onChange={(e) => setOption(e.target.value)}
                      value={option}
                    />
                    {optionArr.map((elem, i) => {
                      return <Box key={i}>
                        <IconButton onClick={() => deleteItem(i)}>
                          <Delete />
                        </IconButton>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={elem}
                          onChange={(e) => setCorrectAns(elem)}
                        />
                        <Divider />
                      </Box>
                    })}
                  </Grid>
                  {/* <Typography variant='subtitle2'>Check the Correct Answer</Typography> */}
                  <Grid item xs={4} md={3}>
                    <MuiButton
                      label="Add"
                      className="mt-1 fs-5"
                      color="warning"
                      onClick={AddToOptionARR}
                    />
                  </Grid>
                  <Grid item xs={10} md={5} sx={{ mb: 2 }}>
                    <MuiButton
                      label="Submit Question"
                      onClick={addQuestion}
                      color="custom"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={10} md={12} className='text-md-end'>
                  {formSubmit ? (
                    <CircularProgress />
                  ) : (
                    <MuiButton
                      label="Submit Quiz"
                      onClick={submitQuiz}
                      color="success"
                    />
                  )}
                </Grid>
              </Grid>}
            </Grid>
            <Grid container>
              <Grid item md={10}>
                <Typography variant="p" className="display-4">Questions List</Typography>
                {isLoading ? (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <MuiDataTable
                    dataSource={existedQues}
                    onClickRow={(e) => console.log(e)}
                    colValue={[
                      {
                        key: 'courseName',
                        name: 'Course Name'
                      },
                      {
                        key: 'quizName',
                        name: 'Quiz Name'
                      },
                      {
                        key: 'duration',
                        name: 'Duration'
                      },
                      {
                        key: 'totalMarks',
                        name: 'Total Marks'
                      },
                    ]}
                  />
                )}
              </Grid>
            </Grid >
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default Quiz