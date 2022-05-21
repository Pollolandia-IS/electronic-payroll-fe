import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../src/components/Sidebar'
import { BsCardText, BsGearFill, BsArrowCounterclockwise, BsPersonCircle, BsFillArrowRightSquareFill } from 'react-icons/bs';

export default function Home() {
  return (
    <>
      <Sidebar SidebarItem = {[{ title: 'Nomina', icon: <BsCardText/>, link: '/'},{ title: 'Ajustes', icon: <BsGearFill/>, link: '/Proyecto'},]}/>
    </>

    
  )
}
