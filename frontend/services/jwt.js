const jwt = require('jsonwebtoken');

export const decrypt = (token) => jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);