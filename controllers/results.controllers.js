const Sales = require ('../models/Sales.model')
const Costs = require ('../models/Costs.model')
const Pursaches = require ('../models/Pursache.model.js')


exports.allSales = (req,res,next) =>{
    const {month} = req.body
    const {_id:_owner} = req.body

    Sales.find({month,_owner:req.user._id},{amount:1,client:1})
    .then(months=>{

    const sumall = months.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    console.log(sumall);
        console.log("que es mi months",months)
        res.status(200).json({succesMessage:`${months} El en mes ${month} el total de las ventas es ${sumall}`,months,sumall})//[mounts]
    })
 
}

exports.allCost = (req,res,next) =>{
const {month} = req.body
const {_id:_owner} = req.body

Costs.find({month,_owner:req.user._id},{amount:1,supplier:1})
.then(months=>{

    const sumall = months.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    console.log(sumall);
        console.log("que es mi months",months)
        res.status(200).json({succesMessage:`${months} El en mes ${month} el total de las costos es ${sumall}`,months,sumall})//[mounts]
    })
 
}

exports.allPursaches = (req,res,next) =>{
    
const {month} = req.body
const {_id:_owner} = req.body
//const arryAnother = another.reduce()



Pursaches.find({month,_owner:req.user._id},{_id:0})
.then(months=>{
    //const newMonth=months.toObject()
    
    const sumaPay = months.map(item => item.payroll).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaPay);
    const sumaTaxes = months.map(item => item.taxes).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaTaxes);
    const sumaLigth = months.map(item => item.ligth).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaLigth);
    const sumaPhone = months.map(item => item.phone).reduce((prev, curr) => prev + curr, 0);
    console.log(sumaPhone);


    const anotherArr = months.reduce((acc,cv)=>{
        return [...acc,...cv.another]
    },[])
 
    const resultArr = anotherArr.reduce((acc,cv)=>{
    return  acc+=cv.amount
    },0)

    const totalMonth = sumaPay+sumaTaxes+sumaLigth+ sumaPhone
    
    
        res.status(200).json({succesMessage:` El en mes de ${month}el total de gastos son ${totalMonth}`,months,sumaPay,sumaTaxes,sumaLigth,sumaPhone,totalMonth})
    })
}

