import Login from "../components/Login"
const { generateJSONtoXLSX } = require("/pages/api/services/generateFile");

const LogIn = () => {
  let file = generateJSONtoXLSX();
  return (
    <Login />
  )
}

export default LogIn;