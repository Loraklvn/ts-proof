import React from 'react'
import { Button, Col, Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { StoreState } from '../dataStore/store';
import { registerExpenseApi } from '../utils/api';

type FormData = {
    ARTICULO: string
    NOTA: string
    MONTO: number | string
}

const ExpensesForm = (): React.ReactElement => {
    const { register, handleSubmit } = useForm()
    const { expenses, totalAmount } = useSelector((state: StoreState) => state.expenses)

    const onSubmit = (formData: FormData, e: React.BaseSyntheticEvent | undefined) => {
        const data = {...formData, MONTO: formData.MONTO as number * 1}
        registerExpenseApi(expenses, data)
        e?.target.reset()
    }

    return (
        <>
            <Form className={'mb-0'} onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col} xs={12} md={2}>
                        <FormControl
                            placeholder={'Articulo'}
                            name={'ARTICULO'}
                            ref={register}
                            min={0}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={2}>
                        <FormControl
                            placeholder={'Nota'}
                            name={'NOTA'}
                            ref={register}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={2}>
                        <FormControl
                            placeholder={'Monto'}
                            type={'number'}
                            name={'MONTO'}
                            ref={register}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <Button variant={'success'} type={'submit'}>
                            Agregar
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} md={2}>
                        <h5 className={'m-0'}>Monto total: RD${totalAmount}</h5>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    );
}

export default ExpensesForm;