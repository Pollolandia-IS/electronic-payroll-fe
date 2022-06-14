import {prisma} from "/.db"
export default function handler(req, res) {
    console.log("API")
    if (req.method == "POST"){
        insertEmployeeToDatabase(req, res)
    }
}

async function insertEmployeeToDatabase(req, res){
    console.log(req.body);
    /*if (!req.body.Nombre || !req.body.Cedula || !req.body.selectedEmployees) {
      return res.status(400).json({ error: "Faltan datos" });
    }*/
    try{
        const {Nombre, Cedula, Email, Telefono, CedJuridica} = req.body; 
        const person = await prisma.persona.create({
            data:{
                cedula : Cedula,
                nombre : Nombre,
                telefono : parseInt(Telefono),
            }
        });

        const employee = await prisma.empleado.create({
            data:{
                cedula : Cedula,
                cedulaJuridica : CedJuridica,
            }
        });
        const credentials = await prisma.credenciales.create({
            data:{
                email : Email,
                contrasenna : "default",
                verificado : false,
            }
        });
        const uses = await prisma.hace_uso.create({
            data:{
                cedula: Cedula,
                email: Email,
            }
        });
        result = [person, employee, credentials, uses];
        res.status(200).json({result});
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}