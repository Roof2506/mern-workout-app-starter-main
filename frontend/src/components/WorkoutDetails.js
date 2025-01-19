import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import WorkoutEditForm from './WorkoutEditForm'  

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const [isEditing, setIsEditing] = useState(false)  

  const handleClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts` + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const handleEdit = () => {
    setIsEditing(true)  
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <span className="material-symbols-outlined edit-button" onClick={handleEdit}>edit</span>

      {isEditing && <WorkoutEditForm workout={workout} onClose={() => setIsEditing(false)} />}
    </div>
  )
}

export default WorkoutDetails
