import Navbar from '../../Components/NavBar'
import Aside from '../../Components/Aside'
import RegisterCompanyForm from '../../Components/RegisterCompanyForm'

const navItems = [
  ["Inicio", false, "/"],
  ["Proyectos", false, "/RegisterCompany"],
  ["Reportes", false, "/RegisterCompany"],
  ["Empleados", false, "/RegisterCompany"],
  ["Deducciones", false, "/RegisterCompany"],
  ["Beneficios", false, "/RegisterCompany"],
];

const AsideItems = [
    {
      name: 'Perfil',
      icon: 'user',
      dropDown: [],
    },
    {
      name: 'Cerrar Sesión',
      icon: 'out',
      dropDown: [],
    },
  ];

function RegisterForm(){
    return (
        <>
          <Navbar navItems={navItems}/>
          <Aside items={AsideItems}/>
          <RegisterCompanyForm/>
        </>
        
    );  
}

export default RegisterForm;