const db = require('../db/connection')
class PagamentoController{
    
    
    index(req,res){
        db.query('SELECT * FROM forma_pagamento',(err,result)=>{
            if(err){
              console.log(`Houve um erro ao listar as formas de pagamento: ${err}`)
            }
            res.render('forma-pagamento/listar',{pagamentos:result.rows})
          })
    }
    create(req,res){
        res.render('forma-pagamento/adicionar')
    }
    store(req,res){
        const query = {
            text:'INSERT INTO forma_pagamento(descricao) VALUES ($1)',
            values:[req.body.descricao]
          }
          db.query(query,(err,result)=>{
            if(err){
              console.log(`Houve um erro ao inserir forma de pagamento: ${err}`)
            }
            res.redirect('/forma-pagamento/listar') 
          })    
    }
    
    update(req,res){
        const dados = req.body
        const query = {
            text:'UPDATE forma_pagamento SET descricao=$1  WHERE id=$2',
            values:[dados.descricao,dados.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
                res.redirect('/forma-pagamento/listar')
        })
    }
    delete(req,res){
        const id = req.params.id
        const query = {
            text:'DELETE FROM forma_pagamento WHERE id=$1',
            values:[id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/forma-pagamento/listar')
        })
    }
}
module.exports = new PagamentoController()