import React from 'react'
import { useDispatch } from 'react-redux'
import { filterClientByPaymentDayApi, getClientListApi } from '../utils/api'

const FilterByPatmentDay = (): React.ReactElement => {
  const dispatch = useDispatch()

  const handleFilterByDay = (day: string) => {
    dispatch(filterClientByPaymentDayApi(day))
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination m-0" style={{fontSize: '1rem'}}>
          <li className="page-item"><button className="page-link text-dark" onClick={() => dispatch(getClientListApi())} >Todos</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Lunes')} >Lunes</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Martes')} >Martes</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Miercoles')} >Miercoles</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Jueves')} >Jueves</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Viernes')} >Viernes</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Sabado')} >Sabado</button></li>
          <li className="page-item"><button className="page-link text-dark" onClick={() => handleFilterByDay('Domingo')} >Domingo</button></li>
      </ul>
    </nav>
  )
}

export default FilterByPatmentDay
