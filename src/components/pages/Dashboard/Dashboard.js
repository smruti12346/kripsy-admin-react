import React, {useEffect, useState} from 'react';
import { getChartReport } from '../../../services/chart';
import { Box, Tabs, Tab, TextField } from '@mui/material';
import { Chart } from "react-google-charts";
import axios from 'axios';
import url from '../../../config';
import { auth_check } from '../../../auth';
import './Dashboard.css'
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setdataDetail] = useState([])
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('Annual Report');
  const [today, setToday] = useState({'total': 0, 'card': 0, 'cod': 0})
  const [selectionRange, setSelectionRange] = useState({startDate: new Date(),endDate: new Date(),key: 'selection'})
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isShowRange, setIsShowRange] = useState(false)
  const convertDate = (date) => {
     if(date){
       return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
     }   
  }
  let month_name = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  const handleChange = (event, newValue) => {
       setValue(newValue)
  }
  useEffect(()=> {
      axios.get(`${url}/today-report`).then((res)=>{
          setToday(prevState=> (
            {
              'total': res.data.total_sales,
              'card': res.data.total_sales - res.data.cod,
              'cod': res.data.cod
            }
          ))
      })
  },[])
  useEffect(() => {
       auth_check.then((res)=>{
           if(res.data.user.type === 1 || res.data.user.type === 3){
               return true
           }else{
              window.location.href = '/login'
           }
           
       })
  },[])
      useEffect(() => {   
          console.log(today)       
          setTitle(`Yearly report for ${new Date().getFullYear()}`)
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
        title: title,
      };
      const handleThisYear = () => {    
       setTitle(`Yearly report for ${new Date().getFullYear()}`)
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
       }
      const handlePrevMonth = () => {
        setTitle(`${month_name[new Date().getMonth() - 1]} Month report for ${new Date().getFullYear()}`)
        axios.get(`${url}/chart-this-month`).then((res)=>{
               setData(res.data.data)
               let month = new Date().getMonth()
              let newData = res.data.data.filter((item)=>{
                  return  item.month === month
               })
               console.log(newData)
              const arr_data = newData.map((item)=>{
                  return [String(item.day),Number(item.total_sales)]
               })
               let month_name = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
               arr_data.unshift([`${month_name[new Date().getMonth()]} Month report for ${new Date().getFullYear()}`,'Sales'])
               setdataDetail(arr_data)
               console.log(arr_data)
        })
       }

     const handleThisMonth = () => {
      setTitle(`${month_name[new Date().getMonth()]} Month report for ${new Date().getFullYear()}`)
      axios.get(`${url}/chart-this-month`).then((res)=>{
             setData(res.data.data)
             let month = new Date().getMonth() + 1
            let newData = res.data.data.filter((item)=>{
                return  item.month === month
             })
             console.log(newData)
            const arr_data = newData.map((item)=>{
                return [String(item.day),Number(item.total_sales)]
             })
             let month_name = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
             arr_data.unshift([`${month_name[new Date().getMonth()]} Month report for ${new Date().getFullYear()}`,'Sales'])
             setdataDetail(arr_data)
             console.log(arr_data)
      })
     }
     const handleWeek = () => {
      setTitle(`Last 7 Days report for ${new Date().getFullYear()}`)
      axios.get(`${url}/last-week`).then((res)=>{
             setData(res.data.data)
             let month = new Date().getMonth() + 1
            let newData = res.data.data.filter((item)=>{
                return  item
             })
             console.log(newData)
            const arr_data = newData.map((item)=>{
                return [String(item.day),Number(item.total_sales)]
             })
             let month_name = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
             arr_data.unshift([`${month_name[new Date().getMonth()]} Month report for ${new Date().getFullYear()}`,'Sales'])
             setdataDetail(arr_data)
             console.log(arr_data)
      })
     }
     const handleSelect = (date) => {
          console.log(date)
          setSelectionRange(range=>({
             startDate: range.startDate,
             endDate: range.endDate,
             key: 'selection'
          }))
     }
   //   const selectionRange = {
   //    startDate: new Date(),
   //    endDate: new Date(),
   //    key: 'selection',
   //  }
   const handleDateRange = (update) => {
      
      setDateRange(update);
      if(update[1] != null){
         setTitle(`Range Report`)
         axios.post(`${url}/search-report`, {'start': update[0], 'end': update[1]}).then((res)=> {
            console.log(res)
            setData(res.data.data)
            let month = new Date().getMonth() + 1
           let newData = res.data.data.filter((item)=>{
               return  item
            })
            console.log(newData)
            let month_name = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
           const arr_data = newData.map((item)=>{
               return [String(item.month+"-"+item.day),Number(item.total_sales)]
            })
            
            arr_data.unshift([`${month_name[new Date().getMonth()]} Month report for ${new Date().getFullYear()}`,'Sales'])
            setdataDetail(arr_data)
            console.log(arr_data)
         })
      }
   }

   const handlePicker = () => {
      setIsShowRange(true)
      //document.getElementById('dp').click()
   }
    return (
        <>
        <div className='container' style={{marginTop: '80px'}}> 
        {/* <Calendar
        date={new Date()}
        onChange={handleSelect}
        />   
        <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />     */}
        <div className='row justify-content-center align-items-center' >
               <div class="bg-warning shadow-sm p-3 rounded mb-2 ml-2">
                 <div class="d-flex align-items-center mb-2">
                    <div>
                       <p class="mb-0 bg-light rounded p-2 osahan-icon"><i class="mdi mdi-clock-outline"></i></p>
                    </div>
                   <div class="ml-3 text-white">
                     <p class="mb-0 h6">Today Total Sales</p>
                     <p class="font-weight-bold mb-0 h6">Rs {today.total == null ? 0 : today.total}</p>
                   </div>
                   </div>
                </div>

                <div class="bg-secondary shadow-sm p-3 rounded mb-2 ml-2">
                 <div class="d-flex align-items-center mb-2">
                    <div>
                       <p class="mb-0 bg-light rounded p-2 osahan-icon"><i class="mdi mdi-clock-outline"></i></p>
                    </div>
                   <div class="ml-3 text-white">
                     <p class="mb-0 h6">Today Card Collect</p>
                     <p class="font-weight-bold mb-0 h6">Rs {today.card == null ? 0 : today.card}</p>
                   </div>
                   </div>
                </div>

                <div class="bg-info shadow-sm p-3 rounded mb-2 ml-2">
                 <div class="d-flex align-items-center mb-2">
                    <div>
                       <p class="mb-0 bg-light rounded p-2 osahan-icon"><i class="mdi mdi-clock-outline"></i></p>
                    </div>
                   <div class="ml-3 text-white">
                     <p class="mb-0 h6">Today COD Collect</p>
                     <p class="font-weight-bold mb-0 h6">Rs {today.cod == null ? 0 : today.cod}</p>
                   </div>
                   </div>
                </div>
             </div>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className="mb-3">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="This Year" onClick={handleThisYear}/>
            <Tab label="Last Month" onClick={handlePrevMonth}/>
            <Tab label="This Month" onClick={handleThisMonth} />
            <Tab label="Last 7 Days"  onClick={handleWeek}/>
            <Tab label="RANGE SELECT" onClick={handlePicker}>
            
            </Tab>
          </Tabs>
         
        </Box>
              <div className='row'>
                 <div className='col-12'>
                  <div style={{width: '250px'}} className="mx-auto mb-3">
                 { isShowRange ?
                 (<DatePicker
                   placeholderText='Select date Range'
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                   handleDateRange(update)
                  }}
                  isClearable={true}
                  id="dp"
                  />) : null}
                  </div>
                 </div>

                 <div className='col-12'> 
                       
                    <Chart
                  chartType="AreaChart"
                  data={dataDetail}
                  options={options}
                  width={"100%"}
                  height={"auto"}
                 />            
                 </div>
                 <div className='col-12 mt-4'>
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
