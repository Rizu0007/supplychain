// SPDX_License-Identier: MIT
pragma solidity ^0.8.0;

contract Tracking{
    enum ShipmentStatus{ PENDING , IN_TRANSIT , DELIEVED}

    struct Shipment{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;

    }

    mapping(address =>Shipment[]) public shipments;
    uint256 public ShipmentCount;
     
struct TyepShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;

}

     TyepShipment[] tyepShipments;

     event  ShipmentCreated(
        address  indexed sender,
        address indexed  receiver,
        uint256 pickupTime,
        uint256 distance,
        uint256 price
        );

        event ShipmentInTransit(
        address  indexed sender,
        address indexed  receiver,
        uint256 pickUpTime
        );
event ShipmentDelivered(
      address  indexed sender,
        address indexed  receiver,
        uint deliveryTime
        );
event ShipmentPaid( 
        address  indexed sender,
        address indexed  receiver,
        uint256 amount
        );

         
   constructor() {
    ShipmentCount =0;
    }


   function createShipment(address  _receiver , uint256 _pickUpTime , uint256 _distance , uint256 _price) public payable {

    require(msg.value==_price , "payment amount must match the Price");

    Shipment memory shipment=Shipment(msg.sender , _receiver , _pickUpTime , 0 , _distance , _price , ShipmentStatus.PENDING , false );

       shipments[msg.sender].push(shipment);
       ShipmentCount++;


       tyepShipments.push(
         TyepShipment(
            msg.sender,
            _receiver,
            _pickUpTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING ,
             false 
        )
     );

       emit ShipmentCreated(msg.sender, _receiver, _pickUpTime, _distance, _price);
   }



   function starShipment(address _sender , address _receiver ,  uint256 _index )public {

    Shipment storage shipment=shipments[_sender] [_index];
    TyepShipment storage tyepShipment=tyepShipments[_index];

    require(shipment.receiver==_receiver , "INvalid RECEIVER.");
    require(shipment.status==ShipmentStatus.PENDING , "SHIPMENT ALREADY IN TRANSIT");
    shipment.status=ShipmentStatus.IN_TRANSIT;
    tyepShipment.status=ShipmentStatus.IN_TRANSIT;

    emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);

   }




function completeShipment(address _sender , address _receiver , uint256 _index) public {

    Shipment storage shipment=shipments[_sender][_index];
    TyepShipment storage tyepShipment=tyepShipments[_index];

    require(shipment.receiver==_receiver , "INvalid RECEIVER");
    require(shipment.status==ShipmentStatus.PENDING , "SHIPMENT Not IN TRANSIT");
    require(!shipment.isPaid , "Shipment already paid");

    shipment.status=ShipmentStatus.DELIEVED;
    tyepShipment.status=ShipmentStatus.DELIEVED;



     
    tyepShipment.deliveryTime=block.timestamp;
    shipment.deliveryTime=block.timestamp;


    uint256 amount =shipment.price;
    payable(shipment.sender).transfer(amount);


       shipment.isPaid=true;
       tyepShipment.isPaid=true;


       emit ShipmentDelivered(_sender , _receiver , shipment.deliveryTime);
       emit ShipmentPaid(_sender , _receiver, amount);
   }

   

function getShipment(address _sender , uint256 _index ) public view returns(
    address , address ,uint256 , uint256 , uint256 , uint256, ShipmentStatus, bool)
    {
        Shipment memory shipment=shipments[_sender][_index];
        return(shipment.sender , shipment.receiver , shipment.pickupTime, shipment.deliveryTime,
        shipment.distance, shipment.price , shipment.status, shipment.isPaid);
    }



    function getshipmentCount(address _sender ) public view returns(uint256) {
        return shipments[_sender].length;    
    }


    function getAllTranscation () public view returns (TyepShipment[] memory)
    {
    return tyepShipments;
    }


}

