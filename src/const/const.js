import  dotenv from 'dotenv';
dotenv.config();

const activityStatus = {
  open:'open',
  deleted:'deleted',
  completed:'completed',
  archived:'archived'
}

const userStatus = {
  pending: 'pending',
  active: 'active',
}

const privateKey = process.env.RSA_PRIVATE_KEY;

const publicKey = '-----BEGIN PUBLIC KEY-----\n'+
'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA50xRcFErVdUtcLZBKObO\n'+
'O8GptqJCAIlTvYdwF/imz5rdViicO0rNzzRoRbbPBQkisYsWAwZcND4ygsnUANtg\n'+
'jFGKozp1lfVJsuLkz/HrRoFNFaH7q6gyvhojIOXta9VMQaDhzoFfzBKxVVgc9OjI\n'+
'W8qo6Bn2tbfTlcwC/bsNvdwi/LGKuCopuYLhYXs2r0hmjcDX4FQa4VQbiTbX5DhN\n'+
'UIxcWfRuoBNoTKelVlzi7LJCSOksoBth5EtwAsQX7hePqFtCmUHrmRo8EfuCnn7I\n'+
'C0Yi0zsBn1u/NBhysOySCRjKRJVhT0mCUrX4sDSaCvWZw1r6GB3NQb7GAzJzGysy\n'+
'X/6IpXawWPxX2cIowV95LDG++nxVRVznbZZ4yECmr0bUrY/haKSH62fKQPrBad9f\n'+
'w2B4qY471LH4vpmH/cNcZG7itw+qvhk7v2p4fMPQRmR+zrBvegydsYK2gFMxtu7R\n'+
'1RdYOw8WynpW51Yg5q8qqUdakcCq8NOY3u6fCSaYQJvybq20DAI56MDrJvQ2hRIo\n'+
'oXkf6NFfSkd6lIjd3UrI8nGl/o1G1KBDjeipIG9wJBBs14kJCMjT1o6xuFiUMYz9\n'+
'QNMhZVRDV1L5KBLkVDBboEjnFJEdAsLIqyTLiL90jwo61ZFohmGIpY8RIuuRNoDo\n'+
'1YZ0yMAdL6GNTgymufYwCAUCAwEAAQ==\n'+
'-----END PUBLIC KEY-----';

const mailConfig = {
  senderAddress: process.env.SENDER_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  subject: 'todolist registration',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  html: '',
}

export {
  activityStatus,
  userStatus,
  privateKey,
  publicKey,
  mailConfig,
}