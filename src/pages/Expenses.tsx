import { Empty } from 'antd';
import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CustomDiv } from '../components/CustomElements';
import { Title1 } from '../components/CustomTypography';
import ExpensesForm from '../components/ExpensesForm';
import { Expenses } from '../dataStore/expensesDuck';
import { StoreState } from '../dataStore/store';
import { getExpensesApi, removeAllExpensesApi, removeExpenseApi } from '../utils/api';



const ExpensesList = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { expenses } = useSelector((state: StoreState) => state.expenses)

    const handleRemoveExpense = (index: number) => {
        const newExpenses = expenses.filter((expense, i) => i !== index) 
        removeExpenseApi(newExpenses)
    }

    const handleRemoveAllExpenses = () => {
        removeAllExpensesApi()
    }

    useEffect(() => {
        dispatch(getExpensesApi())
    }, [dispatch])

    return (
        <>
            <CustomDiv>
                <Title1>Lista de Gastos</Title1>
            </CustomDiv>
            <ExpensesForm />
            <Table style={{ fontSize: '1.05rem' }} striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Articulo</th>
                    <th>Nota</th>
                    <th>Monto</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {expenses?.map((expense: Expenses, i) => {
                    return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{expense.ARTICULO}</td>
                        <td>{expense.NOTA}</td>
                        <td>{expense.MONTO}</td>
                        <td><Button variant={'secondary'} onClick={()=> handleRemoveExpense(i)}>Eliminar</Button></td>
                    </tr>
                    )
                })}
                </tbody>
            </Table>
                {
                    expenses.length > 0 ? 
                    <div className=" d-flex justify-content-end">
                        <Button variant={'danger'} onClick={handleRemoveAllExpenses}>Eliminar Todo</Button> 
                    </div> :
                    <Empty />
                }
        </>
    );
}

export default ExpensesList;