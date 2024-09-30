const activityRepo = require('../repository/activityRepository')

const addActivity = async (data) => {
		const content = data  
    	content['status'] = 'open';
		return await activityRepo.addActivity(content)	
    
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
const deleteActivityFromFile2 = async (id) => {
	return updateActivity(id, {status:'deleted'})
  }
const updateActivity = async (id, params) => {
	return await new Promise((resolve, reject) => {
	  const readlineInterface = readline.createInterface({
		input: fs.createReadStream(dbFile),
		crlfDelay: Infinity
	  });
	  const activities = [];
	  let activity;
	  readlineInterface.on('line', (line) => {
		const activityTemp = JSON.parse(line);
		console.log(activityTemp);
		console.log(id);
		if(activityTemp.id == id) {
		  Object.keys(params).forEach(key => {
			activityTemp[key] = params[key]
		  })
		  activity = {...activityTemp}
		}
		activities.push(JSON.stringify(activityTemp) + '\n')
	  });
	  readlineInterface.on('close', () => {
		fs.writeFile(dbFile, activities.join(''), err => {
		  if (err) { reject(null);}
		  resolve(activity)
		});
	  });
	})
  }
const getActivity = async (id) => {
	if(!fs.existsSync(dbFile)) {
	  return null
	}
	try {
	  return await new Promise((resolve, reject) => {
		const readlineInterface = readline.createInterface({
		  input: fs.createReadStream(dbFile),
		  crlfDelay: Infinity
		});
		readlineInterface.on('line', (line) => {
		  const activity = JSON.parse(line);
		  if(activity.id == id && activity.status !== 'deleted') {
			resolve(activity)
		  }
		});
		readlineInterface.on('close', () => {
		  return reject(new Error('not found',404))
		});
	  })
	} catch(e) {
	  return null
	}
  } */


module.exports = {
    /* getActivity,
    updateActivity,
    deleteActivityFromFile,
    deleteActivityFromFile2, */
	addActivity
}
