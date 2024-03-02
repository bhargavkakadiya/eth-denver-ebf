// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
	struct User {
		bool isVerified;
		string name;
		string hometown;
	}

	struct Project {
		uint256 id;
		address registeredBy;
		string projectName;
		string projectDescription;
		string[] tags;
		string ipfsURI;
	}
}
