import activityRepo from '../repository/activityRepository.js'

const retrieveActivity = async (id) => {
	const activityData = await activityRepo.retrieveActivity(id)

    // link HATEOAS
    const links = {
      self: { href: `/activities/${id}` },
      update: { href: `/activities/${id}`, method: 'PATCH' },
      complete: { href: `/activities/${id}`, method: 'PATCH' },
      uncomplete: { href: `/activities/${id}`, method: 'PATCH' },
      archive: { href: `/activities/${id}`, method: 'PATCH' },
      delete: { href: `/activities/${id}`, method: 'DELETE' },
      list: { href: `/activities`, method: 'GET' }
    };
    console.log({ ...activityData, _links: links });

    return { ...activityData, _links: links }; // Combina i dati con i link HATEOAS
		
  }

const listActivities = async (userId) => {
	return await activityRepo.listActivities(userId)
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
	return activityRepo.archiveActivity(id,userId)
  }



  


export {
 	retrieveActivity,
	addActivity,
	updateActivity,
	removeActivity,
	completeActivity,
	uncompleteActivity,
	archiveActivity,
	listActivities,
}
