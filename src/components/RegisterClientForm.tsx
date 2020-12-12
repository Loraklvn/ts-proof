import React, { useState } from 'react'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
import { DatePicker } from 'antd'
import { useForm } from 'react-hook-form'
import 'moment/locale/es'
import { Moment } from 'moment'
import { RegisterClientData } from '../pages/RegisterClient'
import { Link } from 'react-router-dom'

type PropTypes = {
  handleRegisterClientData: (
    data: RegisterClientData,
    e: React.BaseSyntheticEvent | undefined
  ) => void
  isLoading: boolean
}

const RegisterClientForm = ({
  handleRegisterClientData,
  isLoading,
}: PropTypes): React.ReactElement => {
  const [isDateSelected, setIsDateSelected] = useState(false)
  const [showInitialDateRequired, setShowInitialDateRequired] = useState(false)
  const [initialDate, setInitialDate] = useState('')
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = (
    data: RegisterClientData,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    if (isDateSelected) {
      data.INICIO_PAGO = initialDate
      handleRegisterClientData(data, e)
    } else {
      setShowInitialDateRequired(true)
    }
  }

  const onDateChange = (date: Moment | null, dateString: string) => {
    const resultDate = dateString.split('-').join('')
    setInitialDate(resultDate)
    if (resultDate) {
      setIsDateSelected(true)
      setShowInitialDateRequired(false)
    } else {
      setIsDateSelected(false)
      setShowInitialDateRequired(true)
    }
  }

  const checkIfErrorsEmpty = (): boolean => Object.keys(errors).length === 0

  const fieldValidatorMark = (name: string): string => {
    return !checkIfErrorsEmpty() && errors[name]
      ? 'is-invalid'
      : checkIfErrorsEmpty()
      ? ''
      : 'is-valid'
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className="mr-3">
          Nombres:
        </Form.Label>
        <Col md={6}>
          <FormControl
            name={'NOMBRES'}
            className={fieldValidatorMark('NOMBRES')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Nombres" es requerdio!',
              },
            })}
          />
          <span className={'invalid-feedback'}>{errors?.NOMBRES?.message}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className={'mr-3'}>
          Apellidos:
        </Form.Label>
        <Col md={6}>
          <FormControl
            name={'APELLIDOS'}
            className={fieldValidatorMark('APELLIDOS')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Apellidos" es requerdio!',
              },
            })}
          />
          <span className={'invalid-feedback'}>
            {errors?.APELLIDOS?.message}
          </span>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className={'mr-3'}>
          Apodo:
        </Form.Label>
        <Col md={6}>
          <FormControl name={'APODO'} ref={register} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className={'mr-3'}>
          Cedula:
        </Form.Label>
        <Col md={6}>
          <FormControl
            name={'CEDULA'}
            className={fieldValidatorMark('CEDULA')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Cedula" es requerdio!',
              },
              minLength: {
                value: 11,
                message: 'Coloque un numero de cedula valido!',
              },
            })}
            maxLength={11}
          />
          <span className={'invalid-feedback'}>{errors?.CEDULA?.message}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className={'mr-3'}>
          Telefono:
        </Form.Label>
        <Col md={6}>
          <FormControl
            name={'TELEFONO'}
            className={fieldValidatorMark('TELEFONO')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Telefono" es requerdio!',
              },
            })}
          />
          <span className={'invalid-feedback'}>
            {errors?.TELEFONO?.message}
          </span>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={1} className={'mr-3'}>
          Imagen:
        </Form.Label>
        <Col md={6}>
          <FormControl name={'IMAGEN'} ref={register} type={'file'} />
        </Col>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} xs={6} md={2}>
          <Form.Label>Monto:</Form.Label>
          <FormControl
            name={'MONTO'}
            className={fieldValidatorMark('MONTO')}
            ref={register({
              required: { value: true, message: 'Campo "Monto" es requerdio!' },
            })}
            type={'number'}
          />
          <span className={'invalid-feedback'}>{errors?.MONTO?.message}</span>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={2}>
          <Form.Label>Semanas:</Form.Label>
          <FormControl
            readOnly
            name={'SEMANAS'}
            className={fieldValidatorMark('SEMANAS')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Semanas" es requerdio!',
              },
            })}
            type={'number'}
            defaultValue={13}
          />
          <span className={'invalid-feedback'}>{errors?.SEMANAS?.message}</span>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={2}>
          <Form.Label>Interes:</Form.Label>
          <FormControl
            name={'INTERES'}
            as={'select'}
            className={fieldValidatorMark('INTERES')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Interes" es requerdio!',
              },
            })}
            defaultValue={10}
          >
            <option value={10}>10%</option>
          </FormControl>
          <span className={'invalid-feedback'}>{errors?.INTERES?.message}</span>
        </Form.Group>

        <Form.Group as={Col} xs={6} md={2}>
          <Form.Label>Dia de Pago:</Form.Label>
          <FormControl
            name={'DIA_PAGO'}
            as={'select'}
            className={fieldValidatorMark('DIA_PAGO')}
            ref={register({
              required: {
                value: true,
                message: 'Campo "Dia de Pago" es requerdio!',
              },
            })}
            defaultValue={''}
          >
            <option value={''}>selecciona...</option>
            <option value={'Lunes'}>Lunes</option>
            <option value={'Martes'}>Martes</option>
            <option value={'Miercoles'}>Miercoles</option>
            <option value={'Jueves'}>Jueves</option>
            <option value={'Viernes'}>Viernes</option>
            <option value={'Sabado'}>Sabado</option>
            <option value={'Domingo'}>Domingo</option>
          </FormControl>
          <span className={'invalid-feedback'}>
            {errors?.DIA_PAGO?.message}
          </span>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={2} required>
          <Form.Label>Inicio de Pago:</Form.Label>
          <DatePicker
            onChange={onDateChange}
            className={showInitialDateRequired ? 'is-invalid' : 'is-valid'}
            name={'INICIO_PAGO'}
          />
          <span className={'invalid-feedback'}>
            Debe seleccionar fecha inicial!
          </span>
        </Form.Group>
      </Form.Row>
      <Button variant={'success'} type={'submit'} disabled={isLoading}>
        Registrar
      </Button>
      <Link to={'/'} className={'btn btn-danger ml-2'}>
        Volver
      </Link>
    </Form>
  )
}

export default RegisterClientForm
