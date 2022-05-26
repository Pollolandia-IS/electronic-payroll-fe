//IMPORTAR CONEXION A LA BASE DE DATOS

export default function handler(req, res){
    console.log("API")
    if(req.method === "POST"){
        insertCompanytoDataBase(req, res);
    }
}

async function insertCompanytoDataBase(req, res){
    try{
        console.log(req.body);
        res.status(200);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
} 