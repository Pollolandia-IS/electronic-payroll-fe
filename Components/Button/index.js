import Style from '../../styles/Button.module.css';
import Link from 'next/link';



const ButtonComponent = () => {
  return (
    <Link href="/"><a className={Style.button}>Ver detalles</a></Link>
  )
}

export default ButtonComponent;