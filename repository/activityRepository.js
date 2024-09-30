const fs = require('fs');
const dbFile = '../activity.db';
const readline = require('readline');  
  
  const addActivity = async (data) => {
    const content = data;
    content['id'] = newId();
    content['createdAt'] = new Date().getTime();
    content['updatedAt'] = content.createdAt;

    fs.appendFileSync(dbFile, JSON.stringify(content) + '\n')
    return content
  }

  const newId = () => {
	if (!fs.existsSync(dbFile)) {
		fs.openSync(dbFile, 'w');
	}
	const file = fs.readFileSync(dbFile);
	return file.toString().split('\n').length;
}

  module.exports = {addActivity}
  //module.exports = {addActivity:addActivity} implicitamente js 
    
    