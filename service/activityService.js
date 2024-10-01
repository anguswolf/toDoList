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

const deleteActivityFromFile2 = async (id) => {
	return updateActivity(id, {status:'deleted'})
  }

/* 
const deleteActivityFromFile = async (id) => {
	return await new Promise((resolve, reject) => {
	  const readlineInterface = readline.createInterface({
		input: fs.createReadStream(dbFile),
		crlfDelay: Infinity
	  });
	  const activities = [];
	  readlineInterface.on('line', (line) => {
		const activityTemp = JSON.parse(line);
		if(activityTemp.id != id) {
		  activities.push(JSON.stringify(activityTemp) + '\n')
		}
	  });
	  readlineInterface.on('close', () => {
		fs.writeFile(dbFile, activities.join(''), err => {
		  if (err) { reject(null);}
		  resolve({id})
		});
	  });
	})
  }
 */


module.exports = {
 	retrieveActivity,
	addActivity,
	updateActivity,
	deleteActivityFromFile2
}
