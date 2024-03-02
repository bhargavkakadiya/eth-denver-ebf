// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Structs.sol";
import "./Storage.sol";

contract EBF is ERC1155, Storage {
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
		string memory _projectDescription,
		string[] memory _tags,
		string memory _uri
	) public payable {
		require(
			isRegistered[msg.sender],
			"Only registered users can creat project"
		);

		// Check if the user has enough resources, if we want users to pay for creating projects

		// Proceed with creating the project
		projects[projectCounter] = Structs.Project({
			id: projectCounter,
			registeredBy: msg.sender,
			projectName: _projectName,
			projectDescription: _projectDescription,
			tags: _tags,
			ipfsURI: _uri
		});

		_mint(msg.sender, projectCounter, 1000, "");
		tokenURIs[projectCounter] = _uri;
		++projectCounter;
	}

	function addTagstoProject(
		uint256 _projectId,
		string memory _tag,
		bytes32 _msgHash,
		bytes memory _signature
	) public {
		require(isRegistered[msg.sender], "Only registered users can add tags");
		require(isVerified(_msgHash, _signature), "Invalid Txn Source");

		require(
			projects[_projectId].tags.length <= 6,
			"Maximum of 6 tags are allowed per project."
		);
		projects[_projectId].tags.push(_tag);
	}

	function getAllProjects() public view returns (Structs.Project[] memory) {
		if (projectCounter == 0) {
			return new Structs.Project[](0);
		}

		Structs.Project[] memory allProjects = new Structs.Project[](
			projectCounter
		);

		for (uint256 i = 0; i < projectCounter; i++) {
			allProjects[i] = projects[i];
		}

		return allProjects;
	}

	// Function to get a project by its ID, including all its tags
	function getProjectById(
		uint256 projectId
	) public view returns (Structs.Project memory, string[] memory) {
		Structs.Project memory project = projects[projectId];
		return (project, project.tags);
	}

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

	// Function to get all projects by a user
	function getProjectsByUser(
		address user
	) public view returns (Structs.Project[] memory) {
		uint256 projectCount = 0;
		for (uint256 i = 0; i < projectCounter; i++) {
			if (projects[i].registeredBy == user) {
				projectCount++;
			}
		}

		Structs.Project[] memory userProjects = new Structs.Project[](
			projectCount
		);
		uint256 index = 0;
		for (uint256 i = 0; i < projectCounter; i++) {
			if (projects[i].registeredBy == user) {
				userProjects[index] = projects[i];
				index++;
			}
		}

		return userProjects;
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
