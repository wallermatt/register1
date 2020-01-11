pragma solidity ^0.4.25;

contract Register1 {
    
    address public contractOwner;
    
    struct Record {
        bool registered;
        address owner;
        uint256 timestamp;
        string description;
    }
    
    mapping(string => Record) private records;
    
    function Register1() public {
        contractOwner = msg.sender;
    }
    
    modifier hashNotRegistered(string hash) {
        require(records[hash].registered == false, 'Hash already registered');
        _;
    }

    function createRecord (string hash, string description) public hashNotRegistered(hash) {
        Record memory newRecord = Record ({
            registered: true,
            owner: msg.sender,
            timestamp: block.timestamp,
            description: description
        });
        
        records[hash] = newRecord;
    }
    
    function getRecord(string hash) public returns (bool, address, uint256, string) {
        Record memory result = records[hash];
        return (result.registered, result.owner, result.timestamp, result.description);
    }
    
     
    
}