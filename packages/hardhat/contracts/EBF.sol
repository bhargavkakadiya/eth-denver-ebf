// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Structs.sol";
import "./Storage.sol";

contract EBF is ERC1155, OdysseyStorage {
	uint256 private projectCounter = 0;

	constructor() ERC1155("EBF") {
		deployer = msg.sender;
	}

	// receive() external payable {}

	function registerUser(
		string memory _name,
		string memory _homeTown,
		bytes32 _msgHash,
		bytes memory _signature
	) public {
		require(!isRegistered[msg.sender], "Player is already registered.");
		require(isVerified(_msgHash, _signature), "Invalid Txn Source");

		// Set user info
		users[msg.sender] = Structs.User({
			isVerified: true,
			name: _name,
			hometown: _homeTown
		});

		isRegistered[msg.sender] = true;
	}

	function createProject(
		string memory _projectName,
		string memory _projectType,
		string memory _uri
	) public payable {
		require(
			isRegistered[msg.sender],
			"Only registered users can creat project"
		);

		// Check if the user has enough resources, if we want users to pay for creating projects

		// Proceed with creating the project
		projects[projectCounter] = Structs.Project({
			registeredBy: msg.sender,
			projectName: _projectName,
			projectType: _projectType,
			ipfsURI: _uri
		});

		_mint(msg.sender, projectCounter, 1000, "");
		tokenURIs[projectCounter] = _uri;
		++projectCounter;
	}

	function getAllProjects() public view returns (Structs.Project[] memory) {}

	function isVerified(
		bytes32 _messageHash,
		bytes memory _signature
	) public view returns (bool) {
		// The ethSignedMessageHash is the hash that the signer actually signed
		bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

		// Recover the signer's address from the signature
		address signer = recoverSigner(ethSignedMessageHash, _signature);

		require(signer == deployer, "Unauthorized Contract call");

		return true;
	}

	function getEthSignedMessageHash(
		bytes32 _messageHash
	) public pure returns (bytes32) {
		return
			keccak256(
				abi.encodePacked(
					"\x19Ethereum Signed Message:\n32",
					_messageHash
				)
			);
	}

	function recoverSigner(
		bytes32 _ethSignedMessageHash,
		bytes memory _signature
	) public pure returns (address) {
		(uint8 v, bytes32 r, bytes32 s) = splitSignature(_signature);
		return ecrecover(_ethSignedMessageHash, v, r, s);
	}

	function splitSignature(
		bytes memory sig
	) public pure returns (uint8, bytes32, bytes32) {
		require(sig.length == 65, "invalid signature length");
		bytes32 r;
		bytes32 s;
		uint8 v;

		assembly {
			// first 32 bytes, after the length prefix
			r := mload(add(sig, 32))
			// second 32 bytes
			s := mload(add(sig, 64))
			// final byte (first byte of the next 32 bytes)
			v := byte(0, mload(add(sig, 96)))
		}
		return (v, r, s);
	}
}
