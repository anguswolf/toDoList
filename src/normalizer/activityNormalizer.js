export default (activity) => {
    const out = {
      id: activity._id,
      name: activity.name,
      description: activity.description,
      dueDate: activity.dueDate,
      status: activity.status,
    }
    return out
  }