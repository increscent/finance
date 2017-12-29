import { Router } from 'express';
import { verifyAccount, handleApiErrors } from './middleware';
import accountRoutes from './accountRoutes';
import periodRoutes from './periodRoutes';
import categoryRoutes from './categoryRoutes';
import transactionRoutes from './transactionRoutes';

export default Router()

.use('/', verifyAccount)

.use('/account', accountRoutes)
.use('/period', periodRoutes)
.use('/category', categoryRoutes)
.use('/transaction', transactionRoutes)

.use('/', handleApiErrors);
