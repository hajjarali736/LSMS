import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const editstudent = () => {
  const {id} = useParams()
  const [student , setStudent] = useState({
    
  })
  return (
    <div>Edit Employee</div>
  )
}

export default editstudent
