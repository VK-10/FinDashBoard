import React, { useMemo } from 'react'
import DashboardBox from '@/components/Dashboard'
import { useGetProductsQuery,  useGetKpisQuery, useGetTransactionQuery } from '@/state/api'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import BoxHeader from '@/components/BoxHeader'
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis,YAxis, Tooltip, Area, Legend, Line, LineChart, BarChart, Bar, Rectangle, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';


type Props = {}

const Row3 = (props: Props) => {
  const { palette } = useTheme();
  const pieColor = [palette.primary[800], palette.primary[300]];
  const { data : kpiData } = useGetKpisQuery();
  const {data: productData}= useGetProductsQuery();
  const {data: transactionData}= useGetTransactionQuery();
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [
          {name: key, value: value},
          {name: `${key} of text`, value: totalExpenses - value},
          ]
        }
      )
    }
  }, [kpiData]);

  const productColumns = [
    {
      field : "_id",
      headerName: "id",
      flex: 1,

    },
    {
      field : "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCall: (params: GridCellParams) => `$${params.value}`,

    },
    {
      field : "price",
      headerName: "Price",
      flex: 0.5,
      renderCall: (params: GridCellParams) => `$${params.value}`,

    },
    
  ]

  const transactionColumns = [
    {
      field : "_id",
      headerName: "id",
      flex: 1,

    },
    {
      field : "buyer",
      headerName: "Buyer",
      flex: 0.5,
      renderCall: (params: GridCellParams) => `$${params.value}`,

    },
    {
      field : "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCall: (params: GridCellParams) => `$${params.value}`,

    },

    {
      field : "productIds",
      headerName: "Product Ids",
      flex: 0.15,
      renderCall: (params: GridCellParams) => (params.value as string[]).length,

    },
    
  ]

  return (
    <>
        <DashboardBox gridArea="g">
          <BoxHeader title = "List of Products"
            sidetext = {`${productData?.length} products` }
          />
          <Box
            mt = '0.5rem'
            height = '75%'
            p = "0 0.5rem"
            sx ={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: 'none',
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
                
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
                    
              },
              "& .MuiDataGrid-columnSeperator": {
                visibility: 'hidden',                    
              },


            }}>
          <DataGrid
            columnHeaderHeight = {25}
            rowHeight = {35}
            hideFooter={true}
            rows = {productData || []}
            columns={productColumns}/>
          </Box>

        </DashboardBox>
        <DashboardBox gridArea="h">

        <BoxHeader title = "recent orders"
            sidetext = {`${transactionData?.length} latest Transactions` }
          />
          <Box
            mt = '1rem'
            height = '80%'
            p = "0 0.5rem"
            sx ={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: 'none',
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
                
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
                    
              },
              "& .MuiDataGrid-columnSeperator": {
                visibility: 'hidden',                    
              },
              

            }}>
          <DataGrid
            columnHeaderHeight = {25}
            rowHeight = {35}

            hideFooter={true}
            rows = {transactionData || []}
            columns={transactionColumns}/>
          </Box>

        </DashboardBox>
        <DashboardBox gridArea="i">
          <BoxHeader title = "Expense Breakdiwn by category" sidetext="+4%"/>
          <FlexBetween mt = "0.5rem" gap="0.5rem" p="0 1rem" textAlign={"center"}>
            {pieChartData?.map((data, i) => (
                  <Box key={`${data[0].name}-${i}`}>
                  <PieChart width={110} height={100}
                          
                          >
                          <Pie
                          stroke='none'
                            data={data}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={pieColor[index]} />
                            ))}
                          </Pie>
                        </PieChart>
                        <Typography variant = "h5">{data[0].name}</Typography>
              </Box>
            ))}
            
          </FlexBetween>

        </DashboardBox>
        <DashboardBox gridArea="j">
          <BoxHeader title = "overall summary and explanation" sidetext="+4%"/>
            <Box
              height="15px"
              margin="1.25rem 1rem 0.4rem 1rem"
              bgcolor = {palette.primary[800]}
              borderRadius = "1rem">
              <Box height="15px"
              bgcolor = {palette.primary[600]}
              borderRadius = "1rem"
              width="40%">

              </Box>
            </Box>

        </DashboardBox>
    </>
  )
}

export default Row3