import bcrypt from "bcrypt";
import { dbmysql } from "../connections/database.js";

async function verifyUserExist(email) {
  const sql = "select * from tbl_administradores where email=?";
  const dataLogin = [email];

  const [[user]] = await dbmysql.query(sql, dataLogin);

  return user;
}

async function cadastrarAdm(name, password, email) {
  const sql = "insert into tbl_administradores(nome, hashpass, email) values(?,?,?)";
  const data = [name, password, email];

  await dbmysql.query(sql, data);
}

async function loginAdm(email, password) {
  const adm = await verifyUserExist(email)

  if(!adm) {
    return adm;
  }

  const match = await bcrypt.compare(password, adm.hashpass); 

  if(match){
    return adm;
  }

  return false;
}

async function getAdministradores() {
  const sql = "select * from tbl_administradores"

  const [adm] = await dbmysql.query(sql);

  return adm;
}

async function getPlacesDenuncias() {
  const sql = "select *, uuid_from_bin(uuid) as uuid from tbl_places where denunciado = true"

  const [places] = await dbmysql.query(sql);

  return places;
}

async function getComentariosDenuncia() {
  const sql = "select * from tbl_avaliacoes where denunciado = true"

  const [comentarios] = await dbmysql.query(sql);

  return comentarios;
}

async function getRespostaDenuncia() {
  const sql = "select * from tbl_respostas where denunciado = true"

  const [respostas] = await dbmysql.query(sql);

  return respostas;
}

async function deletarPlace(placeId) {
  const sql = "update tbl_places set deletado = true, deletado_dia = now() where id = ?"

  await dbmysql.query(sql, placeId);
}

async function deletarComentario(avaliacaoId) {
  const sql = "update tbl_avaliacoes set deletado = true, deletado_dia = now() where id = ?"

  await dbmysql.query(sql, avaliacaoId);
}

async function deletarResposta(respostaId) {
  const sql = "update tbl_respostas set deletado = true, deletado_dia = now() where id = ?"

  await dbmysql.query(sql, respostaId);
}

async function aceitarRequest(id) {
  const sql = "update tbl_requisicoes set aceitado = true where id = ?"

  await dbmysql.query(sql, id)
}

async function recusarRequest(id) {
  const sql = "update tbl_requisicoes set recusado_dia = now() where id = ?"

  await dbmysql.query(sql, id)
}

async function getRequest() {
  const sql = "select uuid_from_bin(uuid) as uuid, * from tbl_requisicoes where recusado_dia = null"

  const [request] = await dbmysql.query(sql);

  return request;
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