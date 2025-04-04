import { useMemo } from 'react'
import DashboardBox from '@/components/Dashboard';
import { useGetKpisQuery } from '@/state/api';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis,YAxis, Tooltip, Area, Legend, Line, LineChart, BarChart, Bar} from 'recharts';
import { useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';


type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
    const { data } = useGetKpisQuery();
    console.log("🚀 ~ Row1 ~ data:", data);
    const revenueExpenses = useMemo(() => {
      return (
        data && 
        data[0].monthlyData.map(({ month, revenue, expenses }) =>{
          return {
            name: month.substring(0,3),
            revenue: revenue,
            expenses: expenses
          }
        })
      );
    },[data]);


    const revenueProfit = useMemo(() => {
      return (
        data && 
        data[0].monthlyData.map(({ month, revenue, expenses }) =>{
          return {
            name: month.substring(0,3),
            revenue: revenue,
            profit: (revenue - expenses).toFixed(2)
          }
        })
      );
    },[data]);

    const revenue = useMemo(() => {
      return (
        data && 
        data[0].monthlyData.map(({ month, revenue }) =>{
          return {
            name: month.substring(0,3),
            revenue: revenue
          }
        })
      );
    },[data]);
    

    
  return (
    <>
        <DashboardBox gridArea="a">
        <BoxHeader 
          title = "Revenue and Expenses"
          subtitle = "top line presents revenue, bottom line reports ncr expenes"
          sidetext='+4%'/>
        <ResponsiveContainer width="100%" height="100%">

        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine = {false} style = {{fontSize: "10px"}}/>
          <YAxis 
          tickLine={false}
          axisLine = {{strokeWidth : "0"}}
          style={{fontSize:"10px"}}
          domain = {[8000,23000]}
          />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" dot = {true} stroke= {palette.primary.main} fillOpacity = {1} fill = "url(#colorRevenue)" />
          <Area type="monotone" dataKey="expenses" dot = {true} stroke= {palette.primary.main} fillOpacity = {1} fill = "url(#colorRevenue)" />

        </AreaChart>
      </ResponsiveContainer>


        {/* ---------------second_component--------------- */}

        </DashboardBox>
        <DashboardBox gridArea="b">
          <BoxHeader 
          title = "Profit and revenue"
          subtitle = "top line presents revenue, bottom line reports ncr expenes"
          sidetext='+4%'/>
        <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical = {false} stroke= {palette.grey[800]}/>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine = {false} style = {{fontSize: "10px"}}/>
          <YAxis 
          yAxisId= "left"
          orientation= "left"
          tickLine={false}
          axisLine = {false}
          style={{fontSize:"10px"}}
          />
          <YAxis 
          yAxisId="right"
          orientation= "right"
          tickLine={false}
          axisLine = {false}
          style={{fontSize:"10px"}}
          />
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }}></Legend>
          <Tooltip />
          <Line yAxisId = "left" type="monotone" dataKey="profit" dot = {true} stroke= {palette.tertiary[500]} />
          <Line yAxisId= "right" type="monotone" dataKey="revenue" dot = {true} stroke= {palette.primary.main} />

        </LineChart>
      </ResponsiveContainer>
        </DashboardBox>



        {/* -----------third_component-------------------- */}

        <DashboardBox gridArea="c">
        <BoxHeader 
          title = "Revenue month by month"
          subtitle = "top line presents revenue, bottom line reports ncr expenes"
          sidetext='+4%'/>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical = {false} stroke = {palette.grey[800]} />
          <XAxis dataKey="name"  axisLine = {false} tickLine = {false} style={{fontSize: '10px'}}/>
          <YAxis 
            axisLine = {false}
            tickLine = {false} 
            style={{fontSize: '10px'}}
          />
          <Tooltip />
          <Bar dataKey="revenue" fill="url(#colorRevenue)"  />
        </BarChart>
      </ResponsiveContainer>

        </DashboardBox>
    </>
  )
}

export default Row1