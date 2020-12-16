const db = require('../db/connection')
class UsuarioController{
    
    
    index(req,res){
        db.query('SELECT * FROM usuario',(err,result)=>{
            if(err){
              console.log(`Houve um erro ao listar os usuarios: ${err}`)
            }
            res.render('usuario/listar',{usuarios:result.rows})
          })
    }
    create(req,res){
        res.render('usuario/adicionar')
    }
    store(req,res){
        const query = {
            text:'INSERT INTO usuario(nome,email,senha) VALUES ($1,$2,$3)',
            values:[req.body.nome,req.body.email,req.body.senha]
          }
          db.query(query,(err,result)=>{
            if(err){
              console.log(`Houve um erro ao inserir o usuário: ${err}`)
            }
            res.redirect('/usuario/listar') 
          })    
    }
    
    update(req,res){
        const dados = req.body
        const query = {
            text:'UPDATE usuario SET nome=$1,email=$2,senha=$3  WHERE id=$4',
            values:[dados.nome,dados.email,dados.senha,dados.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
                res.redirect('/usuario/listar')
        })
    }
    delete(req,res){
        const id = req.params.id
        const query = {
            text:'DELETE FROM usuario WHERE id=$1',
            values:[id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/usuario/listar')
        })
    }
}
module.exports = new UsuarioController()