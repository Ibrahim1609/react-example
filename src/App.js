import React, { useState } from 'react'
import './App.css'
import './index.css'

function App () {
  const [completedTaskCount, setCompletedTaskCount] = useState(0)
  const [todoLists, setTodoLists] = useState([])
  const [inputValues, setInputValues] = useState([])
  const [errors, setErrors] = useState([])
  const maxTodoLists = 6

  const handleAddTask = listIndex => {
    const inputValue = inputValues[listIndex].trim()
    if (inputValue === '') {
      setErrors(prevErrors => {
        const updatedErrors = [...prevErrors]
        updatedErrors[listIndex] = 'Task name cannot be empty.'
        return updatedErrors
      })
      return
    }
    // this is for non toched input field
    setErrors(prevErrors => {
      const updatedErrors = [...prevErrors]
      updatedErrors[listIndex] = '' // Clear the error message for this list
      return updatedErrors
    })

    const id = todoLists[listIndex].tasks.length + 1
    const newTask = {
      id: id,
      task: inputValue,
      complete: false
    }
    setTodoLists(prevLists => {
      const updatedTodoLists = [...prevLists]
      updatedTodoLists[listIndex] = {
        ...updatedTodoLists[listIndex],
        tasks: [...updatedTodoLists[listIndex].tasks, newTask]
      }
      return updatedTodoLists
    })

    // Clear the input value for this list
    setInputValues(prevInputValues => {
      const updatedInputValues = [...prevInputValues]
      updatedInputValues[listIndex] = ''
      return updatedInputValues
    })
  }

  const handleComplete = (listIndex, taskId) => {
    setTodoLists(prevLists => {
      const updatedTodoLists = [...prevLists]
      const task = updatedTodoLists[listIndex].tasks.find(
        task => task.id === taskId
      )

      if (task) {
        if (!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1)
        } else {
          setCompletedTaskCount(completedTaskCount - 1)
        }
        task.complete = !task.complete
      }

      updatedTodoLists[listIndex] = {
        ...updatedTodoLists[listIndex],
        tasks: [...updatedTodoLists[listIndex].tasks]
      }
      updatedTodoLists[listIndex].tasks.sort((a, b) =>
        a.complete === b.complete ? 0 : a.complete ? -1 : 1
      )
      return updatedTodoLists
    })
  }

  const handleRemoveTodoList = listIndex => {
    // Get the tasks of the list being removed
    const tasksToRemove = todoLists[listIndex].tasks

    setTodoLists(prevLists =>
      prevLists.filter((_, index) => index !== listIndex)
    )

    // Update the completedTaskCount by subtracting the completed tasks in the removed list
    setCompletedTaskCount(prevCount => {
      const completedTasksToRemove = tasksToRemove.filter(
        task => task.complete
      ).length
      return prevCount - completedTasksToRemove
    })
  }

  const addTodoList = () => {
    if (todoLists.length >= maxTodoLists) {
      alert(`You can only have up to ${maxTodoLists} todo lists.`)
      return
    }

    const newListId = todoLists.length
    const newTodoList = {
      id: newListId,
      name: `Todo List ${newListId + 1}`,
      tasks: []
    }
    setTodoLists(prevLists => [...prevLists, newTodoList])

    // Initialize the input value and error message for this list
    setInputValues(prevInputValues => [...prevInputValues, ''])
    setErrors(prevErrors => [...prevErrors, ''])
  }

  const handleInputChange = (listIndex, value) => {
    setInputValues(prevInputValues => {
      const updatedInputValues = [...prevInputValues]
      updatedInputValues[listIndex] = value
      return updatedInputValues
    })
  }

  return (
    <div className='container'>
      <div className='header'>
        <h2>Multiple Todo Lists</h2>
        {todoLists.length <= maxTodoLists && (
          <button className='todoBtn' onClick={addTodoList}>
            Add Todo List
          </button>
        )}
      </div>
      <div className='todoLists'>
        {todoLists.map((todoList, listIndex) => (
          <div className='todoCard' key={todoList.id}>
            <div className='todoHeader'>
              <h3 style={{ fontSize: '18px' }}>{todoList.name}</h3>
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={() => handleRemoveTodoList(listIndex)}
              >
                <a style={{ color: 'lightsalmon', fontSize: '14px' }} href='#'>
                  Close
                </a>
              </button>
            </div>
            <input
              type='text'
              value={inputValues[listIndex]}
              placeholder='Enter a task name'
              onChange={e => handleInputChange(listIndex, e.target.value)}
              className='todoInput'
            />
            <button
              onClick={() => handleAddTask(listIndex)}
              className='todoTaskAdd'
            >
              + Add
            </button>
            <span>
              {errors[listIndex] && (
                <div style={{ color: '#ff5353' }}>{errors[listIndex]}</div>
              )}
            </span>
            <table>
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task Name</th>
                  <th>Task Status</th>
                </tr>
              </thead>
              <tbody>
                {todoList.tasks.map(task => (
                  <tr
                    key={task.id}
                    style={{
                      textDecoration: task.complete ? 'underline' : 'none'
                    }}
                  >
                    <td>{task.id}</td>
                    <td>
                      <span
                        onClick={() => handleComplete(listIndex, task.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {task.task}
                      </span>
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        checked={task.complete}
                        onChange={() => handleComplete(listIndex, task.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className='footer'>
        <div>Total Completed Tasks: {completedTaskCount}</div>
        <div>
          Total Pending Tasks:{' '}
          {todoLists.reduce(
            (total, list) =>
              total +
              list.tasks.length -
              list.tasks.filter(task => task.complete).length,
            0
          )}
        </div>
      </div>
    </div>
  )
}

export default App
