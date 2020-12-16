const db = require('../db/connection')
class CategoriaController{
    
    index(req,res){
        db.query('SELECT * FROM categoria_produto',(err,result)=>{
            if(err){
              console.log(`Houve um erro ao listar as categorias: ${err}`)
            }
            res.render('categoria-produto/listar',{categorias:result.rows})
          })
    }
    create(req,res){
        res.render('categoria-produto/adicionar')
    }
    store(req,res){
        const query = {
            text:'INSERT INTO categoria_produto(descricao) VALUES ($1)',
            values:[req.body.descricao]
          }
          db.query(query,(err,result)=>{
            if(err){
              console.log(`Houve um erro ao inserir categoria: ${err}`)
            }
            res.redirect('/categoria-produto/listar') 
          })    
    }
    update(req,res){
        const dados = req.body
        const query = {
            text:'UPDATE cliente SET nome=$1,cpf=$2  WHERE id=$3',
            values:[dados.descricao,dados.id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
                res.redirect('/categoria-produto/listar')
        })
    }
    delete(req,res){
        const id = req.params.id
        const query = {
            text:'DELETE FROM categoria_produto WHERE id=$1',
            values:[id]
        }
        db.query(query,(err,result)=>{
            if(err){
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/categoria-produto/listar')
        })
    }
}
module.exports = new CategoriaController()