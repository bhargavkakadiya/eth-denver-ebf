// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Structs.sol";

contract OdysseyStorage {
	address deployer;

	mapping(uint256 => string) public tokenURIs;

	mapping(address => Structs.User) public users;
	mapping(address => bool) public isRegistered;
	mapping(uint256 projectId => Structs.Project) public projects;
}
