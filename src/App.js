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
    /*const request = buildRequest('/ubi','POST', body)
    const response = await fetch(request)
  
    const data = response.ok ? await response.json() : {}
    console.log('data: ', data)
    const newLocations = data.map((item, index) => {
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
    setLocations(newLocations)*/

    setLocations([{
      id: 1,
      position: {
        lat: 19.6509696,
        lng: -99.1133696
      },
      title: 'Vladimir'
    }, {
      id: 2,
      position: {
        lat: 19.3633418,
        lng: -99.2457234
      },
      title: 'Julio'
    }, {
      id: 3,
      position: {
        lat: 19.3633418,
        lng: -99.2457234
      },
      title: 'Vladimir'
    }, {
      id: 4,
      position: {
        lat: 19.6509696,
        lng: -99.1133696
      },
      title: 'Julio'
    }, {
      id: 5,
      position: {
        lat: 19.4264798,
        lng: -99.1607167
      },
      title: 'coffeefy Liverpool'
    }, {
      id: 6,
      position: {
        lat: 19.4362086,
        lng: -99.1572047
      },
      title: 'monumentos a la revolucion'
    }, {
      id: 7,
      position: {
        lat: 19.423746,
        lng: -99.165535
      },
      title: 'parque mexico'
    }, {
      id: 8,
      position: {
        lat: 19.4136963,
        lng: -99.1664513
      },
      title: 'hospital 20 de noviembre'
    }, {
      id: 9,
      position: {
        lat: 19.3756656,
        lng: -99.1745025
      },
      title: 'centro coyoacan'
    }]);
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
