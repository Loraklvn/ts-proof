import React from 'react'
import { auth } from '../firebase';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { showNotification } from '../utils/general';
import { PATH_HOME } from '../constants/routes';

type LoginData = {
  email: string
  password: string
}

const Login = (): React.ReactElement => {
  const {register, handleSubmit} = useForm();

  auth.onAuthStateChanged(function(user) {
    if(user){
      window.location.pathname = PATH_HOME
    }
  });
  
  const onSubmit = (data: LoginData) => {
    auth.signInWithEmailAndPassword(data.email, data.password)
    .catch(function() {
      showNotification({
          title: 'Error!',
          description: 'Email o contraseña es incorrecto!',
          type: 'error'
      })
    })
  }

  return (
    <>
      <div className="py-5 mt-5 d-flex justify-content-center">
        <Card className={'shadow'} style={{ width: '18rem' }}>
          <Card.Title className={'text-center mt-3 mb-0'}>Iniciar sesion</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <FormControl 
                  type={'text'} 
                  name={'email'}
                  placeholder={'Correo'}
                  ref={register}
                />
                
              </Form.Group>
              <Form.Group>
                <FormControl 
                  type={'password'} 
                  name={'password'}
                  placeholder={'Contraseña'}
                  ref={register}
                />

              </Form.Group>
              <Button type={'submit'} variant={'secondary'} block>Iniciar Sesion</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>

  )
}

export default Login
