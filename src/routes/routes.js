import express from "express";
import admController from "../controllers/admController.js";

const routes = express();

routes.post('/cadastrar', admController.cadastrarAdm)
routes.post('/login', admController.loginAdm)

routes.get('/administradores', admController.getAdministradores)
routes.get('/comentarios', admController.getComentariosDenuncia)
routes.get('/places', admController.getPlacesDenuncias)
routes.get('/respostas', admController.getRespostaDenuncia)
routes.get('/request', admController.getRequest)

//Deletes
routes.delete('/comentarios/:id', admController.deletarComentario)
routes.delete('/places/:id', admController.deletarPlace)
routes.delete('/respostas/:id', admController.deletarResposta)

routes.post('aceitar', admController.aceitarRequest)
routes.post('recusar', admController.recusarRequest)


export default routes;