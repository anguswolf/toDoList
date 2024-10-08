import mongoose from 'mongoose';
const dbName = 'todolist'
const user='augustociuccatosti'

const password='pippocalogero'

const connectionUrl = `mongodb+srv://
${user}:${password}
@clustertodolist.lc6tm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=ClusterToDoList'`

const connect = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log('- Connected to MongoDB server');
  } catch (error) {
    console.log('- Connection error', error);
    throw(error);
  }
}
export default connect;