const db = require('../db/connection')
class ClienteController{
    
    // LISTAR TODOS OS REGISTROS
    index(req,res){
        db.query('SELECT * FROM cliente',(err,result)=>{
            if(err){
              console.log(`Houve um erro ao listar os clientes: ${err}`)
            }
            res.render('cliente/listar',{clientes:result.rows})
          })
    }
    create(req,res){
        res.render('cliente/adicionar')
    }
    store(req,res){
        const query = {
            text:'INSERT INTO cliente(nome,cpf) VALUES ($1,$2)',
            values:[req.body.nome,req.body.cpf]
          }
          db.query(query,(err,result)=>{
            if(err){
              console.log(`Houve um erro ao inserir o cliente: ${err}`)
            }
            res.redirect('/cliente/listar') 
          })    
    }
    edit(req,res){
        
        const query = {
           text:'SELECT * FROM cliente WHERE id=$1',
           values:[req.params.id] 
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`houve um erro ao editar: ${err}`)
            }
            res.render('cliente/editar',{cliente:result.rows[0]})
        })
    }
    update(req,res){
        const dados = req.body
        const query = {
            text:'UPDATE cliente SET nome=$1,cpf=$2  WHERE id=$3',
            values:[dados.nome,dados.cpf,dados.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
                res.redirect('/cliente/listar')
        })
    }
    delete(req,res){
        const id = req.params.id
        const query = {
            text:'DELETE FROM cliente WHERE id=$1',
            values:[id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/cliente/listar')
        })
    }
}
module.exports = new ClienteController()