import { useMemo } from 'react'
import DashboardBox from '@/components/Dashboard';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis,YAxis, Tooltip, Area, Legend, Line, LineChart, BarChart, Bar, Rectangle, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Box, Typography} from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@mui/material';



const pieData = [
  {name: "Group A", value: 600},
  {name : "Group B", value: 400},
]

const Row2 = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const pieColor = [palette.primary[800], palette.primary[300]];
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData && 
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) =>{
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses" : nonOperationalExpenses

        }
      })
    );
  },[operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData && 
      productData.map(({_id, price , expense }) =>{
        return {
          id: _id,
          price: price,
          expense: expense,
        }
      })
    );
  }, [productData]);

  return (
    <>
        <DashboardBox gridArea="d">
          <BoxHeader 
          title = "Operational vs Non Operational expenses"
          sidetext='+4%'/>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={operationalExpenses}
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
          <Tooltip />
          <Line yAxisId = "left" type="monotone" dataKey="Non Operational Expenses" dot = {true} stroke= {palette.tertiary[500]} />
          <Line yAxisId= "right" type="monotone" dataKey="Operational Expenses" dot = {true} stroke= {palette.primary.main} />

        </LineChart>
      </ResponsiveContainer>
        </DashboardBox>



        <DashboardBox gridArea="e">
        <BoxHeader title = "Campaigns and Targets" sidetext='+4%'/>
        <FlexBetween mt = "0.25rem" gap="1.5rem" pr = "1 rem">
        <PieChart width={110} height={100}
        margin={{
          top: 0,
          right: -10,
          left: 10,
          bottom: 0,
        }}
        >
        <Pie
        stroke='none'
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColor[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml = "-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant = "h5">Target Sales</Typography>
        <Typography m ="0.3rem 0" variant='h3' color ={palette.primary[300]}>
          83
        </Typography>
          <Typography variant = "h6"> 
            Finance goals of the campaign that is desired</Typography> 
      </Box>

      <Box flexBasis="40%" >
        <Typography variant = "h5">Losses in revenue</Typography>
        <Typography variant = "h6"> 
          Losses are down by 255
        </Typography>
          <Typography mt = "0.4rem" variant = "h5"> 
            Profit margins
          </Typography> 
          <Typography variant = "h6"> 
            Margins are up by 30% from last month
          </Typography> 
      </Box>
      
      </FlexBetween>


        </DashboardBox>









        <DashboardBox gridArea="f">
        <BoxHeader title = "Product Prices vs Expenses" sidetext='+4%'/>
        <ResponsiveContainer width="100%" height="100%">

        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: -10,
          }}
        >
          <CartesianGrid  stroke= {palette.grey[800]}/>
          <XAxis type="number" dataKey="Price" name="Price" axisLine = {false} tickLine = {false} style = {{ fontSize: "10px"}} tickFormatter={(v) =>`$${v}`} />
          <YAxis type="number" dataKey="Expenses" name="Expenses" axisLine = {false} tickLine = {false} style = {{ fontSize: "10px"}} tickFormatter={(v) =>`$${v}`} />
          <ZAxis type="number" range={[20]}/>

          <Tooltip formatter={(v) => `$${v}`}/>
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>

        </DashboardBox>
    </>
  )
}

export default Row2