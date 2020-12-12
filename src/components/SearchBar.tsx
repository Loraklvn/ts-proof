import React from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'

const SearchBar = (): React.ReactElement => {
  return (
    <Form className="mr-5 ml-2">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fa fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl />
      </InputGroup>
    </Form>
  )
}

export default SearchBar
