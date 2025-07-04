import campeoesRouter from "@modules/campeoes/routes/campeoes.routes";
import origensRouter from "@modules/origens/routes/origens.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.get('/', (request, response) =>{
    response.json({message: 'Hello Dev!'});
    return;
})

routes.use('/campeoes', campeoesRouter);
routes.use('/origens', origensRouter);
routes.use('/users', usersRouter); 
routes.use('/sessions', sessionsRouter);
routes.use('/password',passwordRouter)
routes.use('/profile', profileRouter);

export default routes;
