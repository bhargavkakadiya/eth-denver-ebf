// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
	struct User {
		bool isVerified;
		string name;
		string hometown;
	}

	struct Project {
		address registeredBy;
		string projectName;
		string projectType;
		string ipfsURI;
	}
}
