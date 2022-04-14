export const columns = [
  { field: 'id', headerName: 'Id', headerAlign: 'center', width: 200 },
  { field: 'name', headerName: 'Name', headerAlign: 'center', width: 200 },
  { field: 'created_at', headerName: 'Created at', headerAlign: 'center', width: 130 },
  { field: 'owner', headerName: 'Owner', headerAlign: 'center', width: 150 },
  { field: 'category', headerName: 'Category', headerAlign: 'center', width: 160 },
  { field: 'expertise_level', headerName: 'Expertise Level', headerAlign: 'center', width: 200 },
  // {
  //     field: 'edit',
  //     headerName: 'Edit',
  //     headerAlign: 'center',
  //     sortable: false,
  // }
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      // const onClick = (e) => {
      // e.stopPropagation(); // don't select this row after clicking

      // const apiGridApi = params.api;
      // const thisRow: Record<string, GridCellValue> = {};

      // api.getAllColumns()
      //     .filter((c) => c.field !== "__check__" && !!c)
      //     .forEach(
      //     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
      //     );
      // onClick={() => {
      //     parseName(params.row.col6)
      // }}
      // return alert(JSON.stringify(thisRow, null, 4));
      // };

      return (
        <button style={{ cursor: 'pointer' }} onClick={() => editCourse(params.row.id)}>
          Edit
        </button>
      );
    }
  }
];
