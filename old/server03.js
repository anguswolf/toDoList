const fs = require('fs');
const express = require('express');
const app = express();
const dbFile = 'activity.db';
const host = 'localhost';
const port = 8000;
const readline = require('readline');

const createValidator = require('./validators/createValidator');
const updateValidator = require('./validators/updateValidator');


app.use(express.json());


const newId = () => {
	if (!fs.existsSync(dbFile)) {
		fs.openSync(dbFile, 'w');
	}
	const file = fs.readFileSync(dbFile);
	return file.toString().split('\n').length;
}

const add = (req,res) => {
	const content = req.body;
	content['id'] = newId();  
	content['status'] = 'open';
	content['createdAt'] = new Date().getTime();
	content['updatedAt'] = content.createdAt;
	console.log(content);
	fs.appendFile(dbFile, JSON.stringify(content) + '\n', err => {
		if (err) {
			res.status(500).json({message: 'something went wrong '})

		}else{
			res.status(201).json(content);
		}
	});
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
  }

  const get = async (req, res) => {

	const  activityId = req.params['id'];
	const activity = await getActivity(activityId)
	if(activity) {
	  res.status(200).json(activity)
	} else {
	  res.status(404).json({message:'no activity found'});
	}
	
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

  const update = async (req, res) => {
	const  activityId = req.params['id'];
	const activity = await updateActivity(activityId, req.body)
	if(activity) {
	  res.status(200).json(activity)
	} else {
	  res.status(404).json({message:'no activity found'})
	}
  }

  const deleteActivity = async (req, res) => {
	const  activityId = req.params['id'];
	const activity = await deleteActivityFromFile2(activityId)
	if(activity) {
	  res.status(200).json(activity)
	} else {
	  res.status(500).json({message:'server error'})
	}
  }

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


app.post('/',createValidator, add);
app.get('/:id',get);
app.patch('/:id',updateValidator,update);
app.delete('/:id',deleteActivity);

//definire app.use dopo la route app.post, app.patch
app.use((err,req,res,next) => {
	if (err && err.error && err.error.isJoi ) {
		res.status(400).json({
			type:err.type,
			message:err.error.toString()
		})
		
	}else {
		next(err);
	}
})

app.listen(8000, () => {
	console.log('Server is running on http://localhost:8000');
})




//server.listen(port,host, () => {console.log('Server running at localhost:8000')});
//app.listen(port,host, () => {console.log('Server running at http:// ${host}:${port}')});

