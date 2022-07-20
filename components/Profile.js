import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import Router from "next/router";
import Image from 'next/image';
import PasswordModal from '../components/ChangePasswordModal'
import Cookies from "js-cookie";

const Container = styled("div")({  
  backgroundColor: `rgba(255, 255, 255, 1)`,  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `row`,  
  width: `1102px`,  
  height: `1024px`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  padding: `40px 40px 40px 61px`,  
  boxSizing: `border-box`,  
  overflow: `hidden`,  
});
  
const LeftColumn = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `column`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  padding: `0px 92px`,  
  boxSizing: `border-box`,  
  margin: `0px`,  
});
  
const ProfileSection = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `column`,  
  justifyContent: `flex-start`,  
  alignItems: `center`,  
  padding: `0px`,  
  boxSizing: `border-box`,  
  margin: `0px`,  
});
  
const ProfileTitleFrame = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `row`,  
  justifyContent: `flex-start`,  
  alignItems: `center`,  
  padding: `0px 0px 24px 0px`,  
  boxSizing: `border-box`,  
  width: `341px`,  
  margin: `0px`,  
});
  
const ProfileTitle = styled("div")({  
  textAlign: `left`,  
  whiteSpace: `pre-wrap`,  
  color: `rgba(25, 118, 210, 1)`,  
  fontStyle: `normal`,  
  fontFamily: `Inter`,  
  fontWeight: `500`,  
  fontSize: `32px`,  
  letterSpacing: `1.28px`,  
  textDecoration: `none`,  
  textTransform: `none`,  
  margin: `0px`,  
});
  
const ProfileForm = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `column`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  padding: `6px 0px 45px 0px`,  
  boxSizing: `border-box`,  
  margin: `0px`,  
});

const UserId = styled(TextField)({  
  width: `356px`,  
  margin: `0px`,
});

const UserName = styled(TextField)({
  width: `356px`,  
  margin: `15px 0px 0px 0px`,   
});
  
const UserPhone = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,  
});
  
const UserEmail = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,  
});
  
const UserPassword = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,
  cursor: `pointer`,
});
  
const CompanySection = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `row`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  padding: `0px`,  
  boxSizing: `border-box`,  
  height: `510px`,  
  width: `356px`,  
  margin: `0px`,  
});
  
const CompanyTitle = styled("div")({  
  textAlign: `left`,  
  whiteSpace: `pre-wrap`,  
  color: `rgba(25, 118, 210, 1)`,  
  fontStyle: `normal`,  
  fontFamily: `Inter`,  
  fontWeight: `500`,  
  fontSize: `32px`,  
  letterSpacing: `1.28px`,  
  textDecoration: `none`,  
  textTransform: `none`,  
  position: `absolute`,  
  left: `0px`,  
  top: `0px`,  
});
  
const CompanyForm = styled("div")({  
  display: `flex`,  
  position: `absolute`,  
  isolation: `isolate`,  
  flexDirection: `column`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  padding: `30px 0px`,  
  boxSizing: `border-box`,  
  left: `0px`,  
  top: `38px`,  
});

const CompanyId = styled(TextField)({
  width: `356px`,  
  margin: `0px`, 
});

const CompanyName = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`, 
});
  
const CompanyPhone = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,  
});
  
const CompanyEmail = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,  
});
  
const CompanyLocation = styled(TextField)({  
  width: `356px`,  
  margin: `15px 0px 0px 0px`,  
});
  
const RightColumn = styled("div")({  
  display: `flex`,  
  position: `relative`,  
  isolation: `isolate`,  
  flexDirection: `column`,  
  justifyContent: `center`,  
  alignItems: `center`,  
  padding: `0px`,  
  boxSizing: `border-box`,  
  height: `896px`,  
  margin: `0px`,  
});
  
const SaveChangesButton = styled(Button)({  
  margin: `63px 0px 0px 0px`,  
});
 
function Profile(props) {
  const [passwordModalOpened, setpasswordModalOpened] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);  
  const [validFields, setValidFields] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);

  const [isValidCompanyName, setIsValidCompanyName] = useState(true);
  const [isValidCompanyId, setIsValidCompanyId] = useState(true);
  const [isValidCompanyEmail, setIsValidCompanyEmail] = useState(true);
  const [isValidCompanyPhone, setIsValidCompanyPhone] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [validCompanyFields, setValidCompanyFields] = useState(false);
  const [companyDataChanged, setCompanyDataChanged] = useState(false);

  const [UserValues, setUserValues] = useState({
    Username: props.userData.name,
    UserId: props.userData.id,
    Useremail: props.userData.email,
    Userphone: props.userData.phone,
  });

  const [CompanyValues, setCompanyValues] = useState({
      Companyname: props.companyData.name,
      Companyid: props.companyData.legalid,
      Companyphone: props.companyData.phone,
      Companyemail: props.companyData.email,
      Companyaddress: props.companyData.address,
  });

  const handleUserDataChange = (event) => {
    setUserValues({ ...UserValues, [event.target.id]: event.target.value });
    if(event.target.id === 'Username'){
      //console.log((event.target.value) !== props.userData.name, event.target.value, props.userData.name );
      event.target.value.length > 0 ? setIsValidName(true) : setIsValidName(false);
    };
    if(event.target.id === 'UserId'){
      event.target.value.length === 9 ? setIsValidId(true) : setIsValidId(false);
      if( isNaN(event.target.value) ) {
        setIsValidId(false);
      };
    };
    if(event.target.id === 'Userphone'){
      event.target.value.length === 8 ? setIsValidPhone(true) : setIsValidPhone(false);
      if( isNaN(event.target.value) ) {
        setIsValidPhone(false);
      };
    };
    if(event.target.id === 'Useremail'){
      event.target.value.length > 3 && event.target.value.includes("@") ? setIsValidEmail(true) : setIsValidEmail(false);
    };
  };

  const handleCompanyDataChange = (event) => {
    setCompanyValues({ ...CompanyValues, [event.target.id]: event.target.value });
    if(event.target.id == 'Companyname'){
      event.target.value.length > 0 ? setIsValidCompanyName(true) : setIsValidCompanyName(false);
    };
    if(event.target.id == 'Companyid'){
      event.target.value.length === 12 ? setIsValidCompanyId(true) : setIsValidCompanyId(false);
      if( isNaN(event.target.value)) {
        setIsValidCompanyId(false);
      };
    };
    if(event.target.id == 'Companyphone'){
      event.target.value.length === 8 ? setIsValidCompanyPhone(true) : setIsValidCompanyPhone(false);
      if( isNaN(event.target.value)) {
        setIsValidCompanyPhone(false);
      };
    };
    if(event.target.id == 'Companyemail'){
      event.target.value.length > 3 && event.target.value.includes("@") ? setIsValidCompanyEmail(true) : setIsValidCompanyEmail(false);
    };
    if(event.target.id == 'Companyaddress'){
      event.target.value.length > 0 ? setIsValidAddress(true) : setIsValidAddress(false);
    };
  };

  const validateUserFields = () => {
    const userInputsChanged = 
      UserValues.Username !== props.userData.name ||
      UserValues.UserId !== props.userData.id ||
      UserValues.Useremail !== props.userData.email ||
      UserValues.Userphone !== props.userData.phone;
      setUserDataChanged(userInputsChanged);
    setValidFields(() => {
      return (isValidName && isValidId && isValidEmail && isValidPhone && userInputsChanged );
    });

  };

  const validateCompanyFields = () => {
    const companyInputsChanged =
    CompanyValues.Companyname !==  props.companyData.name ||
    CompanyValues.Companyid !== props.companyData.legalid ||
    CompanyValues.Companyphone !== props.companyData.phone||
    CompanyValues.Companyemail !== props.companyData.email||
    CompanyValues.Companyaddress !== props.companyData.address;
    setCompanyDataChanged(companyInputsChanged);
    setValidCompanyFields(() => {
      return (isValidCompanyName && isValidCompanyId && isValidCompanyEmail && isValidCompanyPhone && isValidAddress && companyInputsChanged);
    });

    console.log('company ', isValidCompanyName, isValidCompanyId, isValidCompanyEmail, isValidCompanyPhone, isValidAddress, companyInputsChanged);
  };

  useEffect(() => { validateUserFields(); validateCompanyFields(); });

  const handleSubmit = async () => {
    if(userDataChanged) {
      const newUserData = {
        userName: UserValues.Username,
        userId: UserValues.UserId,
        oldId: props.userData.id,
        userEmail: UserValues.Useremail,
        oldEmail: props.userData.email,
        userPhone: UserValues.Userphone,
        isEmployer: props.isEmployer,
      }
      try {
        const response = await fetch(`/api/editProfile/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData),
        });
        const token = await response.json();
        console.log('FROM Profile ', token)
        Cookies.set("token", token, { expires: 7 });
      } catch (error) {
      console.error(error);
      }
    }
    if(companyDataChanged){
      const newCompanyData = {
        companyName: CompanyValues.Companyname,
        companyId: CompanyValues.Companyid,
        oldCompanyId: props.companyData.legalid,
        companyPhone: CompanyValues.Companyphone,
        companyEmail: CompanyValues.Companyemail,
        companyAddress: CompanyValues.Companyaddress,
      }
      try {
        await fetch(`/api/editCompany/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCompanyData),
        });
      } catch (error) {
      console.error(error);
      }
    }
    Router.reload();
  }

  return (
    <>
      <Container>
       <PasswordModal isOpen={passwordModalOpened} setpasswordModalOpened={setpasswordModalOpened} pw={props.userData.password} email={props.userData.email}/>
       <LeftColumn>
         <ProfileSection>
           <ProfileTitleFrame>
             <ProfileTitle>
               {`Tu Perfil`}
                 </ProfileTitle>
           </ProfileTitleFrame>
           <ProfileForm>
             <UserId id="UserId" variant="outlined" size="medium"  label={`Cédula`} defaultValue={props.userData.id} onChange={handleUserDataChange} inputProps={{ maxLength: 9, readOnly: true}} />
             <UserName id="Username" variant="outlined" size="medium"  label={`Nombre`} defaultValue={props.userData.name} onChange={handleUserDataChange}/>
             <UserPhone id="Userphone" variant="outlined" size="medium"  label={`Teléfono`} defaultValue={props.userData.phone} onChange={handleUserDataChange} inputProps={{ maxLength: 8 }} />
             <UserEmail id="Useremail" variant="outlined" size="medium"  label={`Email`} defaultValue={props.userData.email} onChange={handleUserDataChange}/>
             <UserPassword type="password" variant="outlined" size="medium"  label={`Contraseña`} defaultValue={props.userData.password} onClick={()=> setpasswordModalOpened(true)} inputProps={{ readOnly: true, }} sx={{cursor: `pointer`}} />
           </ProfileForm>
         </ProfileSection>
         <CompanySection>
           <CompanyTitle>
             {`Tu Empresa`}
               </CompanyTitle>
           <CompanyForm>
             <CompanyId id="Companyid" variant="outlined" size="medium"  label={`Cédula Jurídica`} defaultValue={props.companyData.legalid} onChange={handleCompanyDataChange} inputProps={{ maxLength: 12, readOnly: true, }}/>
             <CompanyName id="Companyname" variant="outlined" size="medium"  label={`Razón Social`} defaultValue={props.companyData.name} onChange={handleCompanyDataChange} disabled={!props.isEmployer}/>
             <CompanyPhone id="Companyphone" variant="outlined" size="medium"  label={`Teléfono`} defaultValue={props.companyData.phone} onChange={handleCompanyDataChange} disabled={!props.isEmployer}/>
             <CompanyEmail id="Companyemail" variant="outlined" size="medium"  label={`Email`} defaultValue={props.companyData.email} onChange={handleCompanyDataChange} disabled={!props.isEmployer}/>
             <CompanyLocation id="Companyaddress" variant="outlined" size="medium" multiline rows={3} label={`Dirección`} defaultValue={props.companyData.address} onChange={handleCompanyDataChange} disabled={!props.isEmployer}/>
           </CompanyForm>
         </CompanySection>
       </LeftColumn>
       <RightColumn>
         <Image  src={"/assets/img/womanWork.png"} alt={"Woman Working"} height={400} width={500} />
         <SaveChangesButton type="submit" variant="contained" size="large" color="primary" disabled={!validFields && !validCompanyFields} onClick={handleSubmit}> GUARDAR CAMBIOS </SaveChangesButton>
       </RightColumn>
     </Container>
    </>
   );
}

export default Profile;
