const Sales = require ('../models/Sales.model')
const Costs = require ('../models/Costs.model')
const Pursaches = require ('../models/Pursache.model.js')


exports.allSales = (req,res,next) =>{
    const {month} = req.body
    const {_id:_owner} = req.body

    Sales.find({month,_owner:req.user._id},{amount:1})
    .then(months=>{

    const sumall = months.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    console.log(sumall);
        console.log("que es mi months",months)
        res.status(200).json({succesMessage:`${months} El en mes ${month} el total de las ventas es ${sumall}`})//[mounts]
    })
 
}

exports.allCost = (req,res,next) =>{
const {month} = req.body
const {_id:_owner} = req.body

Costs.find({month,_owner:req.user._id},{amount:1})
.then(months=>{

    const sumall = months.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    console.log(sumall);
        console.log("que es mi months",months)
        res.status(200).json({succesMessage:`${months} El en mes ${month} el total de las costos es ${sumall}`})//[mounts]
    })
 
}

exports.allPursaches = (req,res,next) =>{
    
    const {month,another} = req.body
const {_id:_owner} = req.body
//const arryAnother = another.reduce()
console.log("que es mi array Another", another)


Pursaches.find({month,_owner:req.user._id},{_id:0})
.then(months=>{
   
    const sumaPay = months.map(item => item.payroll).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaPay);
    const sumaTaxes = months.map(item => item.taxes).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaTaxes);
    const sumaLigth = months.map(item => item.ligth).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaLigth);

   


    

    const totalMonth = sumaPay+sumaTaxes+sumaLigth
    console.log("cual es mi total",totalMonth)


        console.log("que es mi months",months)
        res.status(200).json({succesMessage:` El en mes de ${month} ${another} el total de gastos son ${totalMonth}`})//[mounts]
    })
}