import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapsComponemt from './components/WexMaps';
import dayjs from 'dayjs';
import { buildRequest } from './network';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations({
      fecha: dayjs().format("YYYY-MM-DD"),
      class: "\"location\""
    });
  }, [])

  useEffect(() => {

  }, [locations])

  const getDate = (date) => {
    getLocations({
      fecha: dayjs(date).format("YYYY-MM-DD"),
      class: "\"location\""
    });
  }

  const getLocations = async (body) => {
    const request = buildRequest('/ubi','POST', body)
    const response = await fetch(request)
  
    const data = response.ok ? await response.json() : {}
    console.log('data: ', data.ubi)
    const newLocations = data.ubi.map((item, index) => {
      const location = item.ubi.split(',');
      console.log('location: ', location);
      
      return {
        id: `${index}`,
        position: {
          lat: Number(location[0]),
          lng: Number(location[1])
        },
        title: `${item.user}`
      }
    })
    console.log('newLocations: ', newLocations);
    setLocations(newLocations)
  }

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        sx={{
          backgroundColor: '#60BCFF',
          padding: '5% 0',
          color: '#FFFFFF',
          justifyContent: 'space-around'
        }}
      >
        <Stack
          direction="row"
          sx={{
            display: 'flex'
          }}
        >
          <BarChartIcon
            sx={{
              fontSize: '3.6rem',
              marginTop: '10px'
            }}
          />

          <Typography
            sx={{
              fontSize: '3.6rem'
            }}
          >
            Reportes
          </Typography>
        </Stack>

        <Stack sx={{ marginTop: '15px' }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              onChange={e => getDate(e)}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>

      <Stack>
        <MapsComponemt locationsProps={locations} />
      </Stack>
    </Stack>
  );
}

export default App;
