import React from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { filterClientByNameApi, getClientListApi } from '../utils/api'

const SearchBar = (): React.ReactElement => {
  const dispatch = useDispatch()

  const handleFilterByName = (str: string) => {
    str !== ''
      ? dispatch(filterClientByNameApi(str))
      : dispatch(getClientListApi())
  }

  return (
    <Form className="mr-5 ml-2">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fa fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={(e) => handleFilterByName(e.target.value)} />
      </InputGroup>
    </Form>
  )
}

export default SearchBar
