import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';


const validationSchema = yup.object({
  name: yup
    .string('Введите Ваше имя')
    .required('Обязательно введите имя')
    .max(30, 'Имя не может превышать 30 символов'),
  email: yup
    .string('Введите Ваш email')
    .email('Введите корректный email')
    .required('Email обязателен'),
  message: yup
    .string('Введите Ваше сообщение')
    .required('Обязательно введите сообщение')
    .max(1500, 'Сообщение не может превышать 1500 символов')
    .min(8, 'Сообщение не может быть менее 8 символов'),
});


function FeedbackForm() {

  const handleSubmit = useCallback((values) => {
    console.log(JSON.stringify(values, null, 2));
    // Далее будет код построения запроса к серверу и отправка данных формы.
  }, [/*тут "по хорошему" нужно указать зависимости*/]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  
  return (
    <>
    <Toolbar />
    <Box
      maxWidth={600}
      p={2}
      mb={4}
      sx={{ display: 'flex', flexDirection: 'column' }}
      >
      
      <h1>Обратная связь</h1>
      <form onSubmit={formik.handleSubmit}>
         <TextField
          fullWidth
          id="name"
          name="name"
          label="Ваше имя"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
         <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />

        <TextField
          fullWidth
          id="message"
          name="message"
          label="Сообщение (не более 1500 символов)"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          margin="normal"
          multiline
          rows={4}
        />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            sx = {{my: 2}}
          >Отправить</Button>
        </form>
    </Box>
    </>
  );
}

export default FeedbackForm;