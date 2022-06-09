import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ postgoal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(postgoal.createdAt).toLocaleString('en-US')}</div>
      <h2>{postgoal.text}</h2>
      <button
        className="close"
        onClick={() => dispatch(deleteGoal(postgoal._id))}
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
