//Reusable table component

import { TableContainer } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable(props) {
    return (
        <TableContainer style={{ height: props.height, width: props.width }}>
            <DataGrid
                autoPageSize
                rows={props.rows}
                columns={props.columns}
                rowsPerPageOptions={[5]}
                density={"comfortable"}
                hideFooterSelectedRowCount
            />
        </TableContainer>
    );
}
