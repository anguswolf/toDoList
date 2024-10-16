export default (activity) => {
    const out = {
      name: activity.name,
      description: activity.description,
      dueDate: activity.dueDate,
      status: activity.status,
    }
    return out
  }