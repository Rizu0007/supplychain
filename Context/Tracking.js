import React , {useState , useEffect} from "react";
import Web3Modal from 'web3modal';
import {ethers } from 'ethers';


import tracking from '..Context/Tracking.json';
import { TrackingContext } from './Tracking';
const COntractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const COntractABI=tracking.abi;

//Fetch smart 

const fetchContract=(signerOrProvider)=>
new ethers.Contract(COntractAddress , COntractABI ,signerOrProvider);


export const TrackingContext=React.createContext();
export const TrackingProvider=({children})=>{


    //State variable


const DappName="Product Tracking Dapp"
const [currentUser , setCurrentUser]=useState("");


const CreateShipment=async(items)=>{
    console.log(items)

    const {receiver , pickUpTime , distance , price}=items;

try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider=new ethers.providers.Web3Provider(connection);
    const signer=provider.getSigner();
    const contract=fetchContract(signer);

    const createItem=await contract.CreateShipment(
        receiver,
        new Date(pickUpTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
            value:ethers.utils.parseUnits(price,18 ),
        }
    )
    await createItem.wait();
    console.log(createItem);


}catch(error){
    console.log("Some want Wrong" , error);
}

}

const getAllShipment=async()=>{

    try {
        const provider=new ethers.providers.JsonRpcProvider();
        const contract=fetchContract(provider);
        const  shipments=await contract.getAllShipment();
        const allShipments=shipments.map((shipment)=>({
            sender:shipment.sender,
            receiver: shipment.receiver,
            price:ethers.utils.formatEther(shipment.price.toString()),
            pickUpTime:shipment.pickUpTime.toNumber(),
            deliveryTime:shipment.deliveryTime.toNumber(),
            isPaid:shipment.isPaid,
            status:shipment.status,
        
        }))
        return allShipments
        
    } catch (error) {
        console.log("error want , Getting shipments ")
        
    }

}



const getShipmentsCount=async()=>{
    try {
        if(!window.ethereum) return "Install METAMASK ";

        const accounts=await window.ethereum.request({

            method:"eth_accounts",
        })
        const provider=new ethers.providers.JsonRpcProvider();
         const contract=fetchContract(provider);
         const shipmentsCount=await contract.getShipmentsCount(accounts[0]);
         return shipmentsCount.toNumber();


    } catch (error) {
        console.log("error want getting shipment")

        
    }
}



 const completeShipment=async(completeShip)=>{
    console.log(completeShip);

    const {receiver , sender}=completeShip;
    try {
        if(!window.ethereum) return "Install METAMASK ";

        const accounts=await window.ethereum.request({

            method:"eth_accounts",
        });

        const web3Modal=new Web3Modal();
        const connection=await web3Modal.connect();
        const provider=new ethers.providers.Web3Provider(connection);
        const signer=provider.getSigner();
        const contract=fetchContract(signer);

   const transaction =await contract.completeShipment(
    accounts[0],
    receiver,
    index,
    {
        gasLimit:30000,
    }
   );

   transaction.wait();
   consol.log(transaction);
        
    } catch (error) {
        
    }

 }

}