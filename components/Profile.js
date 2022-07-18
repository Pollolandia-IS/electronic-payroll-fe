import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react'
import Image from 'next/image';

 
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
  
const UserName = styled(TextField)({  
  width: `356px`,  
  margin: `0px`,  
});
  
const UserId = styled(TextField)({  
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
  
const CompanyName = styled(TextField)({  
  width: `356px`,  
  margin: `0px`,  
});
  
const CompanyId = styled(TextField)({  
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
 
function Profile() {

  const [UserValues, setUserValues] = useState({
    Username: "",
    UserId: "",
    UserEmail: "",
    UserPhone: "",
});

const [CompanyValues, setCompanyValues] = useState({
    companyName: "",
    companyID: "",
    businessName: "",
    companyPhone:"",
    companyEmail: "",
    companyAddress: "",
});

  return (
    <Container>
       <LeftColumn>
         <ProfileSection>
           <ProfileTitleFrame>
             <ProfileTitle>
               {`Tu Perfil`}
                 </ProfileTitle>
           </ProfileTitleFrame>
           <ProfileForm>
             <UserName variant="outlined" size="medium"  label={`Nombre`} />
             <UserId variant="outlined" size="medium"  label={`Cédula`} />
             <UserPhone variant="outlined" size="medium"  label={`Teléfono`} />
             <UserEmail variant="outlined" size="medium"  label={`Email`} />
             <UserPassword variant="outlined" size="medium"  label={`Contraseña`} />
           </ProfileForm>
         </ProfileSection>
         <CompanySection>
           <CompanyTitle>
             {`Tu Empresa`}
               </CompanyTitle>
           <CompanyForm>
             <CompanyName variant="outlined" size="medium"  label={`Razón Social`} />
             <CompanyId variant="outlined" size="medium"  label={`Cédula Jurídica`} />
             <CompanyPhone variant="outlined" size="medium"  label={`Teléfono`} />
             <CompanyEmail variant="outlined" size="medium"  label={`Email`} />
             <CompanyLocation variant="outlined" size="medium"  label={`Dirección`} />
           </CompanyForm>
         </CompanySection>
       </LeftColumn>
       <RightColumn>
         <Image  src={"/assets/img/womanWork.png"} alt={"Woman Working"} height={400} width={500} />
         <SaveChangesButton type="submit" variant="contained" size="large" color="primary" > GUARDAR CAMBIOS </SaveChangesButton>
       </RightColumn>
     </Container>
   );
}

export default Profile;
