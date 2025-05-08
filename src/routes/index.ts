import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', {
    title: 'Hola mundo',
<<<<<<< HEAD
    Nombres: 'Estefani Jeannielys',
=======
    Nombres: 'Estefani Jeanniely',
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
    Apellidos: 'Gonzalez Gonzalez',
    CI: '32.057.736',
    Seccion: '4'
  });
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> ea0a97fd5f673a424b495d758d1ac6840c8a18da
