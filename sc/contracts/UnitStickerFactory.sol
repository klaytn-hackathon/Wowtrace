pragma solidity >=0.4.22 <0.6.0;

contract UnitStampFactory {

  /*
    * STATUS ENUM:
    * - 1: Pre-activation
    * - 2: Activated
    * - 3: In Delivering
    *
  */

  struct UnitStamp {
    address owner;
    address receiver;
    uint8 status;
  }

  mapping (string => UnitStamp) unitStamp;

  event StampCreated(string stamp, address receiver);
  event StampActivated(string stamp, address owner);
  event StampInDelivering(string stamp, address from, address to);
  event ConfirmReceiveDeliveryStamp(string stamp, address owner);

  function initStamp(string memory _stampCode, address _receiver)
    public
    returns (bool)
  {
    UnitStamp storage stamp = unitStamp[_stampCode];
    require(stamp.owner == address(0) && stamp.receiver == address(0));
    require(stamp.status == 0);

    unitStamp[_stampCode] = UnitStamp(_receiver, _receiver, 1);

    emit StampCreated(_stampCode, _receiver);
    return true;
  }

  function activateStamp(string memory _stampCode)
    public
    returns (bool)
  {
    UnitStamp storage stamp = unitStamp[_stampCode];
    require(stamp.owner == msg.sender && stamp.receiver == msg.sender);
    require(stamp.status == 1);

    stamp.status = 2;

    emit StampActivated(_stampCode, msg.sender);
    return true;
  }

  function createDelivery(string memory _stampCode, address _receiver)
    public
    returns (bool)
  {
    UnitStamp storage stamp = unitStamp[_stampCode];
    require(stamp.owner == stamp.receiver && stamp.owner == msg.sender);
    require(stamp.status == 2);

    stamp.receiver = _receiver;
    stamp.status = 3;

    emit StampInDelivering(_stampCode, msg.sender, _receiver);
    return true;
  }

  function receiveDelivery(string memory _stampCode)
    public
    returns (bool)
  {
    UnitStamp storage stamp = unitStamp[_stampCode];
    require(stamp.owner != stamp.receiver && stamp.receiver == msg.sender);
    require(stamp.status == 3);

    stamp.owner = msg.sender;
    stamp.status = 2;

    emit ConfirmReceiveDeliveryStamp(_stampCode, msg.sender);
    return true;
  }

  function getStampInfo(string memory _stampCode)
    public
    view
    returns (address, address, uint8)
  {
    UnitStamp memory stamp = unitStamp[_stampCode];
    return (stamp.owner, stamp.receiver, stamp.status);
  }
}