import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutEditForm = ({ workout, onClose }) => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState(workout.title)
  const [load, setLoad] = useState(workout.load)
  const [reps, setReps] = useState(workout.reps)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedWorkout = { title, load, reps }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts` + workout._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'UPDATE_WORKOUT', payload: json }) 
      onClose()  
    }
  }

  return (
    <form className="edit-workout" onSubmit={handleSubmit}>
      <h3>Edit Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Save Changes</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutEditForm
