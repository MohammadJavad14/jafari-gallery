import bcrypt from 'bcryptjs';

const users = [{
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        phoneNumber: '0987654321',
    },
    {
        name: 'محمد جواد علیزاده',
        email: 'mohammd@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
    {
        name: 'امیرعلی علیزاده',
        email: 'ali@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
    {
        name: 'امیر ملاجان',
        email: 'amir@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
    {
        name: 'حسین نیکنام',
        email: 'nik@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
    {
        name: 'آرین الماسی',
        email: 'arian@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
    {
        name: 'حسین ترابی',
        email: 'torabi@example.com',
        password: bcrypt.hashSync('123456', 10),
        phoneNumber: '0987654321',
    },
];

export default users;