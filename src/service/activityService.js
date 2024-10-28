import activityRepo from '../repository/activityRepository.js'

const retrieveActivity = async (id) => {
	const activity = await activityRepo.retrieveActivity(id)
	if (activity.status === 'archived') {
		return {};
	}
	return activity;
	
  }

const addActivity = async (data) => {
		const content = data  
    	content['status'] = 'open';
		return await activityRepo.addActivity(content)	
    
}

const updateActivity = async (id, params) => {
	return await activityRepo.updateActivity(id,params)
  }

const removeActivity = async (id) => {
	return activityRepo.removeActivity(id)
  }

const completeActivity = async (id, userId) => {
	return activityRepo.completedActivity(id,userId)
  }

const uncompleteActivity = async (id, userId) => {
	return activityRepo.uncompletedActivity(id,userId)
  }

const archiveActivity = async (id, userId) => {
	return activityRepo.archivedActivity(id,userId)
  }

const retrieveActivities = async () => {
	const activities = await activityRepo.retrieveActivities()
	//console.log("SERVICE: "+ activities)
	const result = activities.filter(activity => activity.status !== 'archived');
	return result;
	
  }


  export {
 	retrieveActivity,
	addActivity,
	updateActivity,
	removeActivity,
	completeActivity,
	uncompleteActivity,
	archiveActivity,
	retrieveActivities,
}
