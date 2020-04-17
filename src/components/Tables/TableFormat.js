import { createMuiTheme } from "@material-ui/core/styles";

const TableFormat = createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: '#ececec',
            height:'60px'
          }
      },
      MUIDataTableBodyCell: {
          root: {
            position:'relative', 
            zIndex: 1,
            width: 900
          }
      },
      MUIDataTable: {
          responsiveStacked: {
              maxHeight: 'none',
            },
          root: {
            backgroundColor: "#FF000"
          },
          paper: {
            boxShadow: "none"
          }
      },
      MUIDataTableToolbarSelect: {
          root: {
              backgroundColor: '#ececec',
          },
          deleteIcon:{
            color:'#ececec',
            position: 'relative',
            pointerEvents:'none'
            //top: '-500px',
          }
      },
      MuiToolbar: {
          gutters:{
          },
          regular: {
          },
          root: {
              backgroundColor: '#fafafa'
          },
          icon: {
              color: '#f89417'
          },
      },
      MUIDataTableToolbar: {
          actions: {

          },
          icon: {
            color: '#f89417',
            position:'relative', 
            zIndex: 1
          },
          iconActive: {
            color: '#f89417',
            position:'relative', 
            zIndex: 1
          },
        },
        MuiSvgIcon: {
          root: {
              fontSize: '36px',
          },
        },
        MuiTableCell: {
          root: {
              padding: '4px 1px 4px 10px' ,
              
          },
        },
        MuiTablePagination: {
            toolbar: {
            }, 
            select:{
              paddingRight: '32px'
            }
        },
        MuiTableFooter: {
          root: {
            backgroundColor: '#fafafa',
          }
        }, 
        MUIDataTableSelectCell: {
          root:{
            '@media (max-width:959.95px)': { display: 'block' }
          },
          headerCell: {
            backgroundColor: '#ececec'
          }
        },
        MuiButtonBase: {
          root: {
            //backgroundColor: 'transparent'
          }
        },

    },
    
  });

  export {
    TableFormat,
  };
  
