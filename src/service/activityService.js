import activityRepo from '../repository/activityRepository.js'

const retrieveActivity = async (id) => {
	return await activityRepo.retrieveActivity(id)
	
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



  


export {
 	retrieveActivity,
	addActivity,
	updateActivity,
	removeActivity,
	completeActivity
}
