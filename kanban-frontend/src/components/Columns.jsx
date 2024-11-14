import React from 'react'
import Done from './Done'
import DoingColumn from './DoingColumn'
import TodoColumn from './TodoColumn'

const Columns = () => {
  return (
    <div>
      <TodoColumn/>
      <DoingColumn />
      <Done />
    </div>
  )
}

export default Columns
