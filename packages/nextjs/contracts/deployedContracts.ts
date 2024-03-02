/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    EBF: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "TransferBatch",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "TransferSingle",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "value",
              type: "string",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "URI",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_projectId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_tag",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "_msgHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "addTagstoProject",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "accounts",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
          ],
          name: "balanceOfBatch",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_projectName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_projectDescription",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_tags",
              type: "string[]",
            },
            {
              internalType: "string",
              name: "_uri",
              type: "string",
            },
          ],
          name: "createProject",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllProjects",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "registeredBy",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "projectName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "projectDescription",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "tags",
                  type: "string[]",
                },
                {
                  internalType: "string",
                  name: "ipfsURI",
                  type: "string",
                },
              ],
              internalType: "struct Structs.Project[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
          ],
          name: "getEthSignedMessageHash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "projectId",
              type: "uint256",
            },
          ],
          name: "getProjectById",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "registeredBy",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "projectName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "projectDescription",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "tags",
                  type: "string[]",
                },
                {
                  internalType: "string",
                  name: "ipfsURI",
                  type: "string",
                },
              ],
              internalType: "struct Structs.Project",
              name: "",
              type: "tuple",
            },
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isRegistered",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "isVerified",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "projectId",
              type: "uint256",
            },
          ],
          name: "projects",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "registeredBy",
              type: "address",
            },
            {
              internalType: "string",
              name: "projectName",
              type: "string",
            },
            {
              internalType: "string",
              name: "projectDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "ipfsURI",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_ethSignedMessageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "recoverSigner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_homeTown",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "_msgHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "registerUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeBatchTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "sig",
              type: "bytes",
            },
          ],
          name: "splitSignature",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "tokenURIs",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "uri",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "bool",
              name: "isVerified",
              type: "bool",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "hometown",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        balanceOf: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        balanceOfBatch: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        isApprovedForAll: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        safeBatchTransferFrom:
          "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        safeTransferFrom: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        setApprovalForAll: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        supportsInterface: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        uri: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        isRegistered: "contracts/Storage.sol",
        projects: "contracts/Storage.sol",
        tokenURIs: "contracts/Storage.sol",
        users: "contracts/Storage.sol",
      },
    },
  },
  59140: {
    EBF: {
      address: "0x24794146E99978Fa6e75955a0C7D2F950196b383",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "TransferBatch",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "TransferSingle",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "value",
              type: "string",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "URI",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_projectId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_tag",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "_msgHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "addTagstoProject",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "accounts",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
          ],
          name: "balanceOfBatch",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_projectName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_projectDescription",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_tags",
              type: "string[]",
            },
            {
              internalType: "string",
              name: "_uri",
              type: "string",
            },
          ],
          name: "createProject",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllProjects",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "registeredBy",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "projectName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "projectDescription",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "tags",
                  type: "string[]",
                },
                {
                  internalType: "string",
                  name: "ipfsURI",
                  type: "string",
                },
              ],
              internalType: "struct Structs.Project[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
          ],
          name: "getEthSignedMessageHash",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isRegistered",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_messageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "isVerified",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "projectId",
              type: "uint256",
            },
          ],
          name: "projects",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "registeredBy",
              type: "address",
            },
            {
              internalType: "string",
              name: "projectName",
              type: "string",
            },
            {
              internalType: "string",
              name: "projectDescription",
              type: "string",
            },
            {
              internalType: "string",
              name: "ipfsURI",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_ethSignedMessageHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "recoverSigner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_homeTown",
              type: "string",
            },
            {
              internalType: "bytes32",
              name: "_msgHash",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "_signature",
              type: "bytes",
            },
          ],
          name: "registerUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeBatchTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "sig",
              type: "bytes",
            },
          ],
          name: "splitSignature",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "tokenURIs",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "uri",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "bool",
              name: "isVerified",
              type: "bool",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "hometown",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {
        balanceOf: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        balanceOfBatch: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        isApprovedForAll: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        safeBatchTransferFrom:
          "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        safeTransferFrom: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        setApprovalForAll: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        supportsInterface: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
        uri: "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
