import { prisma } from "/.db";
import HourTable from "../../../../components/HourTable";
import HourModal from "../../../../components/HourModal";
import Search from "../../../../components/Search";
import Sidebar from "../../../../components/Sidebar";
import IconBox from "../../../../components/IconBox";
import AddIcon from "@mui/icons-material/Add";
import Styles from "/styles/AddHoursEmployee.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const { companyID, employeeID, projectID } = context.params;
    const hours = await prisma.reporteHoras.findMany({
        where: {
            cedulaEmpleado: employeeID,
        },
    });

    let counter = 0;
    const hoursWithId = hours.map((hourTime) => ({
        id: counter++,
        hours: hourTime.horasTrabajadas,
        date: JSON.stringify(hourTime.fechaHora).split("T")[0].substring(1),
        state: hourTime.nombreProyecto,
    }));

    return {
        props: {
            hoursWithId,
            nombreProyecto: projectID,
            cedulaEmpleado: employeeID,
            cedulaJuridica: companyID,
        },
    };
}

const AddHoursEmployee = ({
    nombreProyecto,
    cedulaEmpleado,
    hoursWithId,
    cedulaJuridica,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [hours, setHoursState] = useState(0);
    const [date, setDateState] = useState("2022-10-08 00:00:00");
    const [button, setButtonState] = useState(true);
    const router = useRouter();

    const handleButtonState = (value) => {
        setButtonState(value);
    };

    const handleHoursChange = (event) => {
        setHoursState(event.target.value);
        if (event.target.value > 0 && event.target.value <= 24) {
            handleButtonState(false);
        } else {
            handleButtonState(true);
        }
    };

    const handleDateChange = (event) => {
        if (event != "Invalid Date") {
            setDateState(event.toISOString().slice(0, 19).replace("T", " "));
            handleButtonState(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/addHoursEmployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employeeID: cedulaEmpleado,
                projectID: nombreProyecto,
                hours,
                date,
            }),
        });
        setShowModal(false);
        router.reload();
    };

    return (
        <>
            <div className={Styles.body}>
                <div className={Styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={Styles.main}>
                    <div className={Styles.head}>
                        <Search />
                        <IconBox action={setShowModal}>
                            <AddIcon fontSize="large" />
                        </IconBox>
                    </div>
                    <div className={Styles.container}>
                        <HourTable rows={hoursWithId} />
                    </div>
                    <HourModal
                        date={date}
                        handleDate={handleDateChange}
                        hours={hours}
                        handleHours={handleHoursChange}
                        employeeID={cedulaEmpleado}
                        project={nombreProyecto}
                        isOpen={showModal}
                        setIsOpen={setShowModal}
                        handleSubmit={handleSubmit}
                        disableButton={button}
                        handleButton={handleButtonState}
                    />
                </div>
            </div>
        </>
    );
};

export default AddHoursEmployee;
