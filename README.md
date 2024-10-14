# Crud simple

Este es un ejemplo de cun curd realizado con react y node.js. se utilizo el freamework NextJS por su simplicidad para este caso de uso.
SE utilizo:

- Node.js
- React
- TypeScript  
- Material UI
- ORM (prisma)
- MySQL
- playwright

tambien se utilizao **Bun** como gestor de paquetes y ejecutucion de desarrollo junto a **docker**

## inicar proyecto

Este proyecto cuenta con un docker-compose.yml para realizar una ejecucion sin instalar dependencias en local. igualmente estos son los pasos a seguir apra el despligue, conciderar la preparacion del url de la base de datos mySQL en el arhico .env:


```bash

npm i
npx prisma generate
npx prisma db push
# or
npx prisma migrate dev

npm run start
# or
npm run dev
```

## realizar test
```bash
# ejecutar test
npx playwright test 
# para visualziar los resultados
npx playwright show-report
```