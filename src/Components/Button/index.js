import Style from '../../styles/Button.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setCardName } from '../../pages/Slices/card/cardSlice';



const ButtonComponent = (nameOfCard) => {
  const dispatch = useDispatch();
  return (
    <Link href="/Proyectos"><a className={Style.button} onClick={() => {dispatch(setCardName(nameOfCard)); }}>Ver detalles</a></Link>
  )
}

export default ButtonComponent;