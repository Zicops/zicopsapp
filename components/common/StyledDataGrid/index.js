import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    'Open Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d'
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `0px solid ${theme.palette.mode === 'light' ? '#f0f0f02b' : '#3030302b'}`,
    fontWeight: '500',
    fontSize: '18px'
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f02b' : '#3030302b'}`,
    fontSize: '16px'
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,0.65)'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#7373732b'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  },
  '& .MuiDataGrid-cell:focus,.MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within':
    {
      outline: 'none'
    },
  '& .MuiDataGrid-columnHeader': {
    border: '0px',
    // borderBottom: '7px solid var(--white)',
    color: 'var(--primary)'
  },
  '& .Mui-resizeTriggers': {
    height: '80%'
  }
}));
export default StyledDataGrid;
