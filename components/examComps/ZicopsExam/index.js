import ZicopsTable from "../../common/ZicopsTable";

const ZicopsExam = () => {

    const columns = [
      {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'course-list-header',
        width: 300
      },
      {
        field: 'type',
        headerClassName: 'course-list-header',
        headerName: 'Type',
        width: 300
        },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: 'course-list-header',
        width: 250
      },
        {
            field: 'action',
            headerClassName: 'course-list-header',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <button style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }} onClick={() => alert('edit')}>
                        <img src='/images/edit-icon.png' width={20}></img>
                    </button>
                )
            }
        } 
    ];

    const data = [
      {
        id: 1,
        name: 'Core Java Fundamentals',
        type: 'Take Anytime',
        status: 'Started'
      },
      {
        id: 2,
        name: 'Design Basics',
        type: 'Take Anytime',
        status: 'Started'
      }
    ];

    return (
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={7}
        rowsPerPageOptions={[3]}
        tableHeight='70vh'
      />
    );
}
 
export default ZicopsExam;