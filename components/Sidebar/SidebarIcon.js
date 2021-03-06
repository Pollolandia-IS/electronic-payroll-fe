/**********************************************************************
*
*   Component generated by Quest
*
*   WARNING: By editing this component by hand, you will lose the ability to regenerate the code without conflicts. 
*   To preseve that abilty, always export from Quest to regenerate this file.
*   To setup props, bindings and actions, use the Quest editor
*   Code Logic goes in the hook associated with this component
*
*   For help and further details refer to: https://www.quest.ai/docs
*
*
**********************************************************************/

import { styled } from '@mui/material/styles';

 
const IconHome = styled("div")({  
  display: `flex`,  
  flexDirection: `row`,  
  justifyContent: `flex-start`,  
  alignItems: `flex-start`,  
  gap: `10px`,  
  padding: `0px`,  
  boxSizing: `border-box`,  
});
  
const Icon1 = styled("div")({  
  display: `flex`,  
  flexDirection: `row`,  
  justifyContent: `center`,  
  alignItems: `center`,  
  gap: `10px`,  
  padding: `0px`,  
  boxSizing: `border-box`,  
  width: `32px`,  
  height: `32px`,  
});
  
const DIcon = styled("img", {
  shouldForwardProp: prop => !["props"].includes(prop)
})(({ theme, props }) =>({  
  height: `20px`,  
  width: `20px`,  
  filter: props.isSelected ? `invert(68%) sepia(81%) saturate(7495%) hue-rotate(196deg) brightness(91%) contrast(81%);` : `none`,
}));
 
function SidebarIcon(props) {
  return (
    <IconHome >
       <Icon1 >
         <DIcon  src={`/assets/icon/${props.icon}.png`} alt={"Sidebar Icon"} props={props} />
       </Icon1>
     </IconHome>
   );
}

export default SidebarIcon;
