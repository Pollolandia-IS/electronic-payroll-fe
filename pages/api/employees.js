import prisma from "/.db"
export default function handler(req, res) {
    console.log("API")
    if (req.method == "POST"){
        insertEmployeeToDatabase(req, res)
    }
}

async function insertEmployeeToDatabase(req, res){
    try{
        const {Nombre, Cedula, Email, Telefono, Foto} = req.body; 
        const result = await prisma.persona.create({
            data:{
                cedula : parseInt(Cedula),
                nombre : Nombre,
                telefono : parseInt(Telefono),
                foto : null,
            }
        
        });
        res.status(200).json.result;
    } catch(error){
        res.status(500).json.result;
        res.send(error.message);
    }
}