import DataTable from "./DataTable";

export default function HourTable(props) {

  const columns = [
    { field: 'hours', headerName: 'Horas', width: 100, align: 'center', headerAlign: 'center', disableColumnMenu: true  },
    { field: 'date', headerName: 'Fecha de Registro', width: 200, align: 'center', headerAlign: 'center', disableColumnMenu: true },
    { field: 'state', headerName: 'Estado', width: 200, align: 'center', headerAlign: 'center', disableColumnMenu: true},
  ];

  //TODO - Get the rows from the database
  //TODO - Remove sort or fix date sorting (add sortable: false to the columns)

  return (
    <DataTable rows={props.rows} columns={columns} height={797} width={500} />
  );
}
