import bcrypt from 'bcrypt';
import service from '../services/admService.js';
import { generateToken } from "../helpers/tokens.js";

const saltRounds = 10;

async function cadastrarAdm(req, res) {
  let hash;
  try{
    const {name, password, email} = req.body;

    if(password && password != "") {hash = await bcrypt.hash(password, saltRounds)}

    await service.cadastrarAdm(name,hash, email);

    res.status(200).send({message: "Cadastrado"});
  } catch(err) {
    res.status(500).send({message: err})
  }
}

async function loginAdm(req, res){
  try {
    const {email, password} = req.body;

    const adm = await service.loginAdm(email, password);
    if(adm) {
      const id = adm.id
      const email = adm.email;
			const nome = adm.nome;
      const token = generateToken(id, nome, email)
      res.status(200).send({message: `Login efetuado com sucesso:`, token})
    } else {
      res.status(401).send({message: "Login incorreto"})
    }
  } catch(err){
    res.status(500).send({message: err})
  }
}

async function getAdministradores(req, res) {
  try {
    const adm = await service.getAdministradores();

    res.status(200).send(adm);
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function getPlacesDenuncias(req, res) {
  try {
    const places = await service.getPlacesDenuncias();

    res.status(200).send(places);
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function getComentariosDenuncia(req, res) {
  try {
    const comentarios = await service.getComentariosDenuncia();

    res.status(200).send(comentarios);
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function getRespostaDenuncia(req, res) {
  try {
    const respostas = await service.getRespostaDenuncia();

    res.status(200).send(respostas);
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function deletarPlace(req, res) {
  try {
    const {id} = req.params;
    await service.deletarPlace(parseInt(id));
    res.status(200).send({message: "Deletado"});
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function deletarComentario(req, res) {
  try {
    const {id} = req.params;
    await service.deletarComentario(parseInt(id));
    res.status(200).send({message: "Deletado"});
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function deletarResposta(req, res) {
  try {
    const {id} = req.params;
    await service.deletarResposta(parseInt(id));
    res.status(200).send({message: "Deletado"});
  } catch(err) {
    res.status(500).send({message: err});
  }
}

async function aceitarRequest(req, res) {
  try {
    const {id} = req.params;
    await service.aceitarRequest(parseInt(id))
    res.status(200).send({message: "Aceitado"})
  } catch(err) {
    res.status(500).send({message: err})
  }
}

async function recusarRequest(req, res) {
  try {
    const {id} = req.params;
    await service.recusarRequest(parseInt(id))
    res.status(200).send({message: "Recusado com sucesso"})
  } catch(err) {
    res.status(500).send({message: err})
  }
}

async function getRequest(req, res) {
  try {
    const request = await service.getRequest();

    res.status(200).send(request)
  } catch (err) {
    res.status(500).send({message: err})
  }
}

export default {
  cadastrarAdm, 
  loginAdm,
  getAdministradores,
  getComentariosDenuncia,
  getPlacesDenuncias,
  getRespostaDenuncia,
  deletarComentario,
  deletarPlace,
  deletarResposta,
  aceitarRequest,
  recusarRequest,
  getRequest,
}