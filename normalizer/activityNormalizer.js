export default (activity) => {
    const out = {
      _id: activity._id,
      name: activity.name,
      description: activity.description,
      dueDate: activity.dueDate,
      status: activity.status,
    }
    return out
  }