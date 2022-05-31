const { PrismaClient } = require('@prisma/client')
const CommonDomain = require('./CommonDomain')

const prisma = new PrismaClient()

module.exports = new CommonDomain(prisma.post)