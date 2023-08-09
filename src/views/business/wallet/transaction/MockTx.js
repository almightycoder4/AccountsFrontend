import { Badge } from 'reactstrap'
const status = {
    1: { title: 'Processing', color: 'light-warning' },
    2: { title: 'Success', color: 'light-success' },
    3: { title: 'Failed', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
  }

  const tx_status = {
    1: { title: 'Sharing', color: 'light-primary' },
    2: { title: 'Top-Up', color: 'light-success' },
    3: { title: 'Transfer', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
  }
// ** Table Intl Column
export const txColumns = [
    {
      name: 'S.No.',
      selector: 'serial',
      sortable: true,
      minWidth: '10px'
    },
    {
      name: 'Sender',
      selector: 'sender',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Receiver',
      selector: 'receiver',
      sortable: true,
      minWidth: '250px'
    },
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        minWidth: '150px'
      },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        )
      }
    },
    {
      name: 'Tx Type',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={'light-primary'} pill>
            {tx_status[row.status].title}
          </Badge>
        )
      }
    }
  ]
  