import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@Teamspeed.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'sej',
    email: 'sej@Teamspeed.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'dvd',
    email: 'dvd@Teamspeed.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'rj',
    email: 'rj@Teamspeed.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users