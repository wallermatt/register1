pragma solidity ^0.4.25;

contract Register1 {
    
    address public contractOwner;
    
    struct Record {
        address owner;
        uint256 timestamp;
        string description;
    }
    
    mapping(string => Record) private records;
    
    function Register1() public {
        contractOwner = msg.sender;
    }
    
    function createRecord (string hash, string description) public {
        Record memory newRecord = Record ({
            owner: msg.sender,
            timestamp: block.timestamp,
            description: description
        });
        
        records[hash] = newRecord;
    }
    
    function getRecord(string hash) public returns (address, uint256, string) {
        Record memory result = records[hash];
        return (result.owner, result.timestamp, result.description);
    }
    
     
    
}