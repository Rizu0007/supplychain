import React , {useState , useEffect} from "react";
import Web3Modal from 'web3modal';
import {ethers } from 'ethers';



import tracking from '../Context/Tracking.json'


const ContractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI=tracking.abi;

//Fetch smart contract

const fetchContract=(signerOrProvider)=>
new ethers.Contract(ContractAddress , ContractABI ,signerOrProvider);


export const TrackingContext=React.createContext();

export const TrackingProvider=({children})=>{

 
    //State variable


const DappName="Product Tracking Dapp"
const [currentUser , setCurrentUser]=useState("");


const createShipment=async(items)=>{
    console.log(items);

    const {receiver , pickUpTime , distance , price}=items;

try{
    const web3Modal=new Web3Modal();
    const connection=await web3Modal.connect();
    const provider=new ethers.providers.Web3Provider(connection);
    const signer=provider.getSigner();
    const contract=fetchContract(signer);

    const createItem=await contract.createShipment(
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


        const  shipments=await contract.getAllTransactions();


        const allShipments=shipments.map((shipment)=>({
            sender:shipment.sender,
            receiver: shipment.receiver,
            price:ethers.utils.formatEther(shipment.price.toString()),
            pickUpTime:shipment.pickUpTime.toNumber(),
            deliveryTime:shipment.deliveryTime.toNumber(),
            isPaid:shipment.isPaid,
            status:shipment.status,
        
        }))
        return allShipments;
        
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
        console.log("WRONG Complete Shipment" , error)
        
    }

 }


const getShipment=async(index) =>{
    console.log(index*1);

try {
    if(!window.ethereum) return "Install METAMASK ";

    const accounts=await window.ethereum.request({

        method:"eth_accounts",
    });

    const provider=new ethers.providers.JsonRpcProvider();
    const contract=fetchContract(provider);
    const shipment=await contract.getShipment(accounts[0] , index*1);

    

    const SingleShipment={
        sender:shipment[0],
        receiver: shipment[1],
        pickUpTime:shipment[2].toNumber(),
        deliveryTime:shipment[3].toNumber(),
        distance:shipment[4].toNumber(),
        price:ethers.utils.formatEther(shipment[5].toString()),
        status:shipment[6],
        isPaid:shipment[7],

    };
 return SingleShipment;


} catch (error) {
    console.log("sorry no shipment")
    
}
}


const startShipment=async(getProducts)=>{



    const {receiver , index }=getProducts;
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

   const shipment =await contract.startShipment(
    accounts[0],
    receiver,
    index*1,
   
   );

   shipment.wait();
   consol.log(shipment);
        
    } catch (error) {
        console.log("sorry No Shipment" , error);
        
    }
}


//check wallet connection

const checkIfWalletConnected=async()=>{
    try {
        if(!window.ethereum) return "Install METAMASK ";

        const accounts=await window.ethereum.request({

            method:"eth_accounts",
        });

       if(accounts.length){
        setCurrentUser(accounts[0]);

       }else{
        return "No Account"
       }
        
    } catch (error) {
        return "No connect"
        
    }
}


    // connect wallet function


    const connectWallet=async()=>{
        try {
            if(!window.ethereum) return "Install METAMASK ";
    
            const accounts=await window.ethereum.request({
    
                method:"eth_requestAccounts",
            });
    
          setCurrentUser(accounts[0]);
            
        } catch (error) {
            return " something Went Wrong"
            
        }
}


//every time check

useEffect(()=>{
    checkIfWalletConnected();


},[])


return(

    <TrackingContext.Provider
    value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
    }}
    >
    {children}

    </TrackingContext.Provider>

)
}