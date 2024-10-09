import userRepo from '../repository/userRepository.js'
import cryptoUtils from '../utils/cryptoUtils.js'
import mailer from 'nodemailer';

const register = async (content) => {
  const  {password, salt} = cryptoUtils.hashPassword(content.password)
  content.password = password;
  content.salt = salt;
  content.registrationToken = cryptoUtils.generateUniqueCode(10)
  const result =  await userRepo.add(content);
  await sendRegistrationMail(content.email,
    buildRegistrationLink(result._id, content.registrationToken))
  return result;
}

const buildRegistrationLink = (id, token) => {
  return `http://localhost:8000/user/${id}/confirm/${encodeURIComponent(token)}`
}
const sendRegistrationMail = async (email, link) => {
	const senderAddress = 'augusto.ciuccatosti@gmail.com';
	const subject = 'todolist registration';
	const body = `Open this link to complete registration ${link}`;
	const transport = {
	  host: 'smtp.gmail.com',
	  port: 465,
	  secure: true, // true for 465, false for other ports
	  auth: {
		user: senderAddress,
		pass: '*****', //creata ad hoc la password per le APP di Google
	  },
	};
	const mailData = {
	  from: `"todolist service" <${senderAddress}>`,
	  subject: subject,
	  text: body,
	  to: email,
	  html: '',
	};
	return await mailer.createTransport(transport).sendMail(mailData);
  }
  
  const confirmRegistration = async (id, token) => {
	return await userRepo.confirmRegistration(id, token);
  }

  const login = async (email, password) => {
	const user =  await userRepo.getByEmail(email);
  
	if (!cryptoUtils.compare(password, user.salt, user.password)) {
	  throw new UnauthorizedException('Unauthorized', 100201)
	}
	const {accessToken, refreshToken} = cryptoUtils.generateTokens(user)
	user.accessToken = accessToken
	user.refreshToken = refreshToken
	return user;
  }
  
  export {
	register,
	confirmRegistration,
	login,
  }