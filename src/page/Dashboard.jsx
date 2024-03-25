import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Box, Breadcrumbs } from "@mui/material";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiStore2Line } from "react-icons/ri";
import IncomeAreaChart from "../components/Dashboard/IncomeAreaChart";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import DefaultTable from "../components/common/DefaultTable";

import { topUserHeader } from "../constants/TableColumns/headings";
import { getCurrentMonth } from "../utils/CommonFunction";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/endpoints";

const Dashboard = () => {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); 

  const {
    data: dashboardData = {},
    isLoading: dashboardLoading,
    refetch: dashboardRefetch,
  } = useQuery([API.Dashboard]);

  const {
    data: topUser = {},
    isLoading: topUserLoading,
    refetch: topUserRefetch,
  } = useQuery([API.GetTopUser]);



  return (
    <Fragment>
      <div className=" ">
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <AiOutlineAppstore
                  size={23}
                  className="min-w-max text-[#020a38]"
                />
                <span className="text-[#020a38] ">&nbsp; Dashboard </span>
              </Box>
            </Link>
            {/* <Typography color="grey">sdfgh</Typography> */}
          </Breadcrumbs>
        </PackageBreadcrumb>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 pb-10">
          <div className="p-4 flex border border-orange-300 rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-orange-400 shadow-md rounded-xl">
              <RiStore2Line size={28} className="text-orange-400" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">{dashboardData?.data?.totalSubscriptions}</h2>
              <p className="text-sm text-gray-300">Total Subscribed Users</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#4fd0d9] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#a1e6eb] shadow-md rounded-xl">
              <PiUsersThreeLight size={28} className="text-[#3da9b1]" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">{dashboardData?.data?.totalUsers}</h2>
              <p className="text-sm text-gray-300">Total Users</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#ef779d] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#fab9ce] shadow-md rounded-xl">
              <MdOutlinePayments size={28} className="text-[#ee80a3]" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">{dashboardData?.data?.totalEarnings} Kr</h2>
              <p className="text-sm text-gray-300">Total Earnings</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#37CF02] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#90f06d] shadow-md rounded-xl">
              <FiCheckCircle size={28} className="text-[#37CF02]" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">{dashboardData?.data?.totalActiveBookings}</h2>
              <p className="text-sm text-gray-300">Active Booking</p>
            </div>
          </div>
        </div>

        <div className="w-full gap-8">
          {/* <div className="lg:col-span-8 col-span-12 border border-primary  p-5 rounded-lg "> */}
            {/* <div className="flex justify-between">
              <p className="text-[16px] font-bold font-sans">Earnings</p>
              <Box sx={{ minWidth: 120 }}>
                <CommonSelect
                  labelId={"earning-label"}
                  id={"earning-label-id"}
                  options={earnings}
                  value={earning}
                  setSelect={setEarnings}
                />
              </Box>
            </div>
            <div className="h-full">
              <IncomeAreaChart slot={earning} height={340} />
            </div> */}
          {/* </div> */}
          <div className="lg:col-span-6 col-span-12">
            <div className="flex justify-between space-x-5 bg-white border-secondary  border border-b-0 rounded-t-lg p-2">
              <div className="p-1 text-lg font-semibold font-sanse">
                Top Users
              </div>
              <div className="p-1">
                {/* <CommonSelect
                  labelId={"months-select"}
                  id={"months-select-id"}
                  options={months}
                  value={selectedOption}
                  setSelect={setSelectedOption}
                /> */}
              </div>
            </div>
            <div className="min-h-80  border border-secondary">
              <DefaultTable
                isLoading={topUserLoading}
                headings={topUserHeader}
                data={topUser?.data}
                disablePagination={true}
                size={size}
                setSize={setSize}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
