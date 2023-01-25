import React, {useEffect, useState} from 'react';
import { getChartReport } from '../../../services/chart';
import { Box, Tabs, Tab } from '@mui/material';
import { Chart } from "react-google-charts";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setdataDetail] = useState([])
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
       setValue(newValue)
  }
      useEffect(() => {
          getChartReport().then((res)=> {
             let month = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
             res.data.data.map((item) => {
                return item.month = month[item.month -1]
             })
             setData(res.data.data)
             //setData01(res.data.data)
            const arr_data = res.data.data.map((item)=>{
                return [item.month,Number(item.total_sales)]
             })
             arr_data.unshift(['Monthly report for 2023','Sales'])
             setdataDetail(arr_data)
             console.log(arr_data)
          }).catch((error)=>{
            console.log(error)
          })
        
      }, []);
      const options = {
        title: "Monthly report",
      };

    return (
        <>
        <div className='container' style={{marginTop: '100px'}}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className="mb-3">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Year" />
            <Tab label="Last Month" />
            <Tab label="This Month" />
            <Tab label="Last 7 Days" />
          </Tabs>
        </Box>
              <div className='row'>
                 <div className='col-6'>                 
                    <Chart
                  chartType="AreaChart"
                  data={dataDetail}
                  options={options}
                  width={"100%"}
                  height={"auto"}
                 />            
                 </div>
                 <div className='col-6'>
                 <Chart
                  chartType="PieChart"
                  data={dataDetail}
                  options={options}
                  width={"100%"}
                  height={"auto"}
                 />
                 </div>
              </div>
        </div>
        
     
        </>
    );
}

export default Dashboard;
