import Style from '../../styles/Button.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setCardName } from '../../pages/Slices/card/cardSlice';



const ButtonComponentCard = (props) => {
  const dispatch = useDispatch();
  return (
    <Link href="/ProjectModule"><a className={Style.button} onClick={() => {
      dispatch(setCardName(props.element)); 
    }}>Ver detalles</a></Link>
  )
}

export default ButtonComponentCard;