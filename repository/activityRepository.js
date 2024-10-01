const fs = require('fs');
const dbFile = '../activity.db';
const readline = require('readline');


const retrieveActivity = async (id) => {
  if (!fs.existsSync(dbFile)) {
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
        if (activity.id == id && activity.status !== 'deleted') {
          resolve(activity)
        }
      });
      readlineInterface.on('close', () => {
        return reject(new Error('not found', 404))
      });
    })
  } catch (e) {
    return null
  }
}

const addActivity = async (data) => {
  const content = data;
  content['id'] = newId();
  content['createdAt'] = new Date().getTime();
  content['updatedAt'] = content.createdAt;

  fs.appendFileSync(dbFile, JSON.stringify(content) + '\n')
  console.log(content)
  return content
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
      if (activityTemp.id == id) {
        Object.keys(params).forEach(key => {
          activityTemp[key] = params[key]
        })
        activity = { ...activityTemp }
      }
      activities.push(JSON.stringify(activityTemp) + '\n')
    });
    readlineInterface.on('close', () => {
      fs.writeFile(dbFile, activities.join(''), err => {
        if (err) { reject(null); }
        resolve(activity)
      });
    });
  })
}

const newId = () => {
  if (!fs.existsSync(dbFile)) {
    fs.openSync(dbFile, 'w');
  }
  const file = fs.readFileSync(dbFile);
  return file.toString().split('\n').length;
}

module.exports = {
  retrieveActivity,
  addActivity,
  updateActivity
}
//module.exports = {addActivity:addActivity} implicitamente js 

