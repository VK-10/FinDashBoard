import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKPisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import .meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: ["Kpis","Products","Transactions"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKPisResponse> , void>({
            query: ()=> "kpi/kpis/",
            providesTags: ["Kpis"]
        }),
        //can add more api endpoints here
        getProducts: build.query<Array<GetProductsResponse> , void>({
            query: ()=> "product/products/",
            providesTags: ["Products"]
        }),
        getTransaction: build.query<Array<GetTransactionsResponse> , void>({
            query: ()=> "transaction/transactions/",
            providesTags: ["Transactions"]
        }),
    }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionQuery } = api;