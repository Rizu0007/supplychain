// SPDX_License-Identier: MIT
pragma solidity ^0.8.0;

contract Tracking{
    enum ShipmentStatus{ PENDING , IN_TRANSIT , DELIEVED}

    struct Shipment{
        address sender;
        address recevier;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;

    }

    mapping(address =>Shipment[]) public Shipments;
    uint256 public ShipmentCount;
     
struct typeshipment {
    address sender;
        address recevier;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;

}

     typeshipment[] typeshipments;

     event  ShipmentCreated(
        address  indexed sender,
        address indexed  recevier,
        uint256 pickupTime,
        uint256 distance,
        uint256 price);

        event ShipmentInTransit(
           address  indexed sender,
        address indexed  recevier,
        uint256 pickupTime,
        uint256 pickUpTime);
event shipmentDelivered(
      address  indexed sender,
        address indexed  recevier,
        uint256 pickupTime,
        uint deliveryTime
        );
event shipmentPaid(  address  indexed sender,
        address indexed  recevier,
        uint256 pickupTime,
        uint256 amount
        );
constructor() {
    ShipmentCount =0;

}


   function createShipment(address  _receiver , uint256 _pickUpTime , uint256 _distance , uint256 _price) public payable {
    require(msg.value==_price , "payment amount must match the price");

    Shipment memory shipment=Shipment(msg.sender , _receiver , _pickUpTime , 0 , _distance , _price , ShipmentStatus.PENDING , false );

    Shipments[msg.sender].push(shipment);
    ShipmentCount++;


     typeshipments.push(
        typeshipment(
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
    Shipment storage shipment=Shipments[_sender] [_index];
    typeshipment storage typeshipments=typeshipments[_index];
    require(shipment.receiver==_receiver , "INvalid RECEIVER");
        require(shipment.status==ShipmentStatus.PENDING , "SHIPMENT ALREADY IN TRANSIT");
 shipment.status=ShipmentStatus.IN_TRANSIT;
 typeshipment.status=ShipmentStatus.IN_TRANSIT;


 emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
   }


function completeShipment(address _sender , address _receiver , uint256 _index) public {

    Shipment storage shipment=Shipments[_sender][_index];
    typeshipment storage typeshipment=typeshipment[_index];
     require(shipment.receiver==_receiver , "INvalid RECEIVER");
        require(shipment.status==ShipmentStatus.PENDING , "SHIPMENT Not IN TRANSIT");
               require(!shipment.isPaid , "Shipment already paid");

                shipment.status=ShipmentStatus.DELIEVED;
                typeshipment.status=ShipmentStatus.DELIEVED;
                typeshipment.deliveryTime=block.timestamp;

                uint256 amount =shipment.price;
                payable(shipment.sender).transfer(amount);


       shipment.isPaid=true;
       typeshipment.isPaid=true;


       emit shipmentDelivered(_sender , _receiver , shipment.deliveryTime);
       emit Shipment(_sender , _receiver, amount);


}

function getShipment(address _sender , uint256 _index ) public view returns(
    address , address ,uint256 , uint256 , uint256 , uint256 Shipment, bool)
    {
        Shipment memory shipment=shipment[_sender][index];
        return(shipment.sender , shipment.recevier , shipment.pickupTime, shipment.deliveryTime,
        shipment.distance, shipment.price , shipment.status, shipment.isPaid);
    }
    function getshipmentCount(address _sender ) public view returns(uint256) {
        return shipment[_sender].length;

        
    }
function getAllTranscation ()     public view returns (typeshipment[] memory){
    return typeshipment;
}
}
