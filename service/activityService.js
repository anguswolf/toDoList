const activityRepo = require('../repository/activityRepository')

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

const deleteActivityFromFile = async (id) => {
	return updateActivity(id, {status:'deleted'})
  }


module.exports = {
 	retrieveActivity,
	addActivity,
	updateActivity,
	deleteActivityFromFile
}
