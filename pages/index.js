import CompleteShipment from "@/Components/CompleteShipment";
import Form from "@/Components/Form";
import GetShipment from "@/Components/GetShipment";
import Profile from "@/Components/Profile";
import Services from "@/Components/Services";
import StartShipment from "@/Components/StartShipment";
import Table from "@/Components/Table";
import { TrackingContext } from "@/Context/Tracking"
import { useContext, useEffect, useState } from "react"


export default function Home() {
  const{
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
    currentUser,

  }=useContext(TrackingContext);


  //state variable



  const [createShipmentModel, setCreateShipmentModel]=useState(false);
  const [openProfile , setOpenProfile]=useState(false);
  const [startModel , setStartModel]=useState(false);
  const [completeModal , setCompleteModal]=useState(false);
  const [getModel , setGetModel]=useState(false);


  //DateState Varibale

  const [allShipmentsData , setAllShipmentsData]=useState();



  useEffect(()=>{
    const getAllCampaignsData=getAllShipment();
    return async()=>{
      const allData=await getAllCampaignsData;
      setAllShipmentsData(allData);
    }
   
  },[])


  return (
   
    <>
    <Services
    setOpenProfile={setOpenProfile}
    setCompleteModal={setCompleteModal}
   setGetModel={setGetModel}
   setStartModel={setStartModel}
   />
   <Table
   setCreateShipmentModel={setCreateShipmentModel}
   allShipmentsData={allShipmentsData}
   />

   <Form

createShipmentModel={createShipmentModel}
createShipment={createShipment}
setCreateShipmentModel={setCreateShipmentModel}
/>

<Profile
openProfile={openProfile}
setOpenProfile={setOpenProfile}
currentUser={currentUser}
getShipment={getShipment}
getShipmentsCount={getShipmentsCount}
/>

<CompleteShipment 
completeModal={completeModal}
setCompleteModal={setCompleteModal}
completeShipment={completeShipment}
/>

<GetShipment
getModel={getModel}
setGetModel={setGetModel}
getShipment={getShipment}
/>
<StartShipment
startModel={startModel}
setStartModel={setStartModel}
startShipment={startShipment}

/>



    </>
  )
}
