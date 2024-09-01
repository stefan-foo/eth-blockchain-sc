/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type { GameBet, GameBetInterface } from "../GameBet";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_home",
        type: "string",
      },
      {
        internalType: "string",
        name: "_away",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_kickOffTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_organizer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "better",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum GameBet.Outcome",
        name: "team",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newKickOffTime",
        type: "uint256",
      },
    ],
    name: "KickOffTimeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "matchAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "organizer",
        type: "address",
      },
    ],
    name: "MatchFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "better",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PayoutClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum GameBet.Outcome",
        name: "result",
        type: "uint8",
      },
    ],
    name: "ResultDeclared",
    type: "event",
  },
  {
    inputs: [],
    name: "away",
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
    name: "bets",
    outputs: [
      {
        internalType: "enum GameBet.Outcome",
        name: "team",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasClaimed",
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
    name: "betters",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "enum GameBet.Outcome",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    inputs: [],
    name: "home",
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
    inputs: [],
    name: "kickOffTime",
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
    inputs: [],
    name: "organizer",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum GameBet.Outcome",
        name: "pick",
        type: "uint8",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rating",
        type: "uint256",
      },
    ],
    name: "rateOrganizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum GameBet.Outcome",
        name: "_result",
        type: "uint8",
      },
    ],
    name: "resolve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resolvedTimestamp",
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
    inputs: [],
    name: "result",
    outputs: [
      {
        internalType: "enum GameBet.Outcome",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBetAway",
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
    inputs: [],
    name: "totalBetHome",
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
    inputs: [],
    name: "totalPool",
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
        internalType: "uint256",
        name: "_newKickOffTime",
        type: "uint256",
      },
    ],
    name: "updateKickOffTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002aad38038062002aad833981810160405281019062000037919062000395565b4283116200007c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200007390620004e2565b60405180910390fd5b84600090816200008d919062000745565b5083600190816200009f919062000745565b508260028190555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600460146101000a81548160ff021916908360038111156200011157620001106200082c565b5b021790555080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050506200085b565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001cb8262000180565b810181811067ffffffffffffffff82111715620001ed57620001ec62000191565b5b80604052505050565b60006200020262000162565b9050620002108282620001c0565b919050565b600067ffffffffffffffff82111562000233576200023262000191565b5b6200023e8262000180565b9050602081019050919050565b60005b838110156200026b5780820151818401526020810190506200024e565b60008484015250505050565b60006200028e620002888462000215565b620001f6565b905082815260208101848484011115620002ad57620002ac6200017b565b5b620002ba8482856200024b565b509392505050565b600082601f830112620002da57620002d962000176565b5b8151620002ec84826020860162000277565b91505092915050565b6000819050919050565b6200030a81620002f5565b81146200031657600080fd5b50565b6000815190506200032a81620002ff565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200035d8262000330565b9050919050565b6200036f8162000350565b81146200037b57600080fd5b50565b6000815190506200038f8162000364565b92915050565b600080600080600060a08688031215620003b457620003b36200016c565b5b600086015167ffffffffffffffff811115620003d557620003d462000171565b5b620003e388828901620002c2565b955050602086015167ffffffffffffffff81111562000407576200040662000171565b5b6200041588828901620002c2565b9450506040620004288882890162000319565b93505060606200043b888289016200037e565b92505060806200044e888289016200037e565b9150509295509295909350565b600082825260208201905092915050565b7f4b69636b206f66662074696d65206d75737420626520696e207468652066757460008201527f7572650000000000000000000000000000000000000000000000000000000000602082015250565b6000620004ca6023836200045b565b9150620004d7826200046c565b604082019050919050565b60006020820190508181036000830152620004fd81620004bb565b9050919050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200055757607f821691505b6020821081036200056d576200056c6200050f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005d77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000598565b620005e3868362000598565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000626620006206200061a84620002f5565b620005fb565b620002f5565b9050919050565b6000819050919050565b620006428362000605565b6200065a62000651826200062d565b848454620005a5565b825550505050565b600090565b6200067162000662565b6200067e81848462000637565b505050565b5b81811015620006a6576200069a60008262000667565b60018101905062000684565b5050565b601f821115620006f557620006bf8162000573565b620006ca8462000588565b81016020851015620006da578190505b620006f2620006e98562000588565b83018262000683565b50505b505050565b600082821c905092915050565b60006200071a60001984600802620006fa565b1980831691505092915050565b600062000735838362000707565b9150826002028217905092915050565b620007508262000504565b67ffffffffffffffff8111156200076c576200076b62000191565b5b6200077882546200053e565b62000785828285620006aa565b600060209050601f831160018114620007bd5760008415620007a8578287015190505b620007b4858262000727565b86555062000824565b601f198416620007cd8662000573565b60005b82811015620007f757848901518255600182019150602085019450602081019050620007d0565b8683101562000817578489015162000813601f89168262000707565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b612242806200086b6000396000f3fe6080604052600436106100fe5760003560e01c806389a78f1a116100955780639fda5d62116100645780639fda5d6214610310578063a0270dbc1461034d578063e88499a914610376578063ecfb49a31461038d578063edf42e4e146103b8576100fe565b806389a78f1a146102485780638fa2e9af146102875780639dfc9117146102b25780639fa92f9d146102e5576100fe565b806362fbbb1d116100d157806362fbbb1d1461019e57806365372147146101c95780636be705f0146101f457806377f623b21461021f576100fe565b806321a45a6114610103578063430468441461012e5780634a0829661461014a5780636120326514610173575b600080fd5b34801561010f57600080fd5b506101186103e3565b604051610125919061154a565b60405180910390f35b6101486004803603810190610143919061158f565b6103e9565b005b34801561015657600080fd5b50610171600480360381019061016c91906115e8565b610748565b005b34801561017f57600080fd5b506101886108d8565b6040516101959190611656565b60405180910390f35b3480156101aa57600080fd5b506101b36108fe565b6040516101c0919061154a565b60405180910390f35b3480156101d557600080fd5b506101de610904565b6040516101eb91906116e8565b60405180910390f35b34801561020057600080fd5b50610209610917565b604051610216919061154a565b60405180910390f35b34801561022b57600080fd5b50610246600480360381019061024191906115e8565b61091d565b005b34801561025457600080fd5b5061026f600480360381019061026a9190611741565b610aa6565b60405161027e93929190611789565b60405180910390f35b34801561029357600080fd5b5061029c610aea565b6040516102a99190611850565b60405180910390f35b3480156102be57600080fd5b506102c7610b78565b6040516102dc99989796959493929190611881565b60405180910390f35b3480156102f157600080fd5b506102fa610d03565b6040516103079190611850565b60405180910390f35b34801561031c57600080fd5b50610337600480360381019061033291906115e8565b610d91565b6040516103449190611656565b60405180910390f35b34801561035957600080fd5b50610374600480360381019061036f919061158f565b610dd0565b005b34801561038257600080fd5b5061038b611166565b005b34801561039957600080fd5b506103a261146c565b6040516103af919061154a565b60405180910390f35b3480156103c457600080fd5b506103cd611472565b6040516103da919061154a565b60405180910390f35b60085481565b6000341161042c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104239061198e565b60405180910390fd5b600060038111156104405761043f611671565b5b600460149054906101000a900460ff16600381111561046257610461611671565b5b146104a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610499906119fa565b60405180910390fd5b600160038111156104b6576104b5611671565b5b8160038111156104c9576104c8611671565b5b14806104f95750600260038111156104e4576104e3611671565b5b8160038111156104f7576104f6611671565b5b145b610538576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052f90611a66565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160010154146105c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b990611ad2565b60405180910390fd5b818160000160006101000a81548160ff021916908360038111156105e9576105e8611671565b5b021790555034816001018190555060008160020160006101000a81548160ff0219169083151502179055506006339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600760008282546106899190611b21565b92505081905550600160038111156106a4576106a3611671565b5b8260038111156106b7576106b6611671565b5b036106da5734600860008282546106ce9190611b21565b925050819055506106f4565b34600960008282546106ec9190611b21565b925050819055505b3373ffffffffffffffffffffffffffffffffffffffff167f9f6b4cced64244a64465098f682029975b1614400b96bc6bd12c668083719166833460405161073c929190611b55565b60405180910390a25050565b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160010154116107d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c990611bf0565b60405180910390fd5b600182101580156107e4575060058211155b610823576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081a90611c5c565b60405180910390fd5b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634bc099d4600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b81526004016108a2929190611cdb565b600060405180830381600087803b1580156108bc57600080fd5b505af11580156108d0573d6000803e3d6000fd5b505050505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b600460149054906101000a900460ff1681565b60025481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109a490611d76565b60405180910390fd5b4281116109ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e690611e08565b60405180910390fd5b60006003811115610a0357610a02611671565b5b600460149054906101000a900460ff166003811115610a2557610a24611671565b5b14610a65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5c90611e9a565b60405180910390fd5b806002819055507f02d1e5f5191779f3f97816f0f6e73da069e815c2d800ee0e47db22a5696ec72b81604051610a9b919061154a565b60405180910390a150565b60056020528060005260406000206000915090508060000160009054906101000a900460ff16908060010154908060020160009054906101000a900460ff16905083565b60018054610af790611ee9565b80601f0160208091040260200160405190810160405280929190818152602001828054610b2390611ee9565b8015610b705780601f10610b4557610100808354040283529160200191610b70565b820191906000526020600020905b815481529060010190602001808311610b5357829003601f168201915b505050505081565b6060806000806000806000806000806001600254600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460149054906101000a900460ff16600754600854600954600680549050888054610bda90611ee9565b80601f0160208091040260200160405190810160405280929190818152602001828054610c0690611ee9565b8015610c535780601f10610c2857610100808354040283529160200191610c53565b820191906000526020600020905b815481529060010190602001808311610c3657829003601f168201915b50505050509850878054610c6690611ee9565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9290611ee9565b8015610cdf5780601f10610cb457610100808354040283529160200191610cdf565b820191906000526020600020905b815481529060010190602001808311610cc257829003601f168201915b50505050509750985098509850985098509850985098509850909192939495969798565b60008054610d1090611ee9565b80601f0160208091040260200160405190810160405280929190818152602001828054610d3c90611ee9565b8015610d895780601f10610d5e57610100808354040283529160200191610d89565b820191906000526020600020905b815481529060010190602001808311610d6c57829003601f168201915b505050505081565b60068181548110610da157600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5790611d76565b60405180910390fd5b8060016003811115610e7557610e74611671565b5b816003811115610e8857610e87611671565b5b1480610eb8575060026003811115610ea357610ea2611671565b5b816003811115610eb657610eb5611671565b5b145b80610ee65750600380811115610ed157610ed0611671565b5b816003811115610ee457610ee3611671565b5b145b610f25576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f1c90611f66565b60405180910390fd5b60006003811115610f3957610f38611671565b5b600460149054906101000a900460ff166003811115610f5b57610f5a611671565b5b14610f9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9290611fd2565b60405180910390fd5b81600460146101000a81548160ff02191690836003811115610fc057610fbf611671565b5b021790555042600381905550600380811115610fdf57610fde611671565b5b600460149054906101000a900460ff16600381111561100157611000611671565b5b146110a9576000606460056007546110199190611ff2565b6110239190612063565b9050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561108d573d6000803e3d6000fd5b5080600760008282546110a09190612094565b92505081905550505b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389631e426040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561111357600080fd5b505af1158015611127573d6000803e3d6000fd5b505050507f805538bc31dcd738dfb8dea897c7697c8e488b99c694044c46e6b9e51da5d1208260405161115a91906116e8565b60405180910390a15050565b6000600381111561117a57611179611671565b5b600460149054906101000a900460ff16600381111561119c5761119b611671565b5b036111dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d390612114565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060020160009054906101000a900460ff1615611271576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161126890612180565b60405180910390fd5b60038081111561128457611283611671565b5b600460149054906101000a900460ff1660038111156112a6576112a5611671565b5b14806112f557508060000160009054906101000a900460ff1660038111156112d1576112d0611671565b5b600460149054906101000a900460ff1660038111156112f3576112f2611671565b5b145b611334576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132b906121ec565b60405180910390fd5b60006113aa826040518060600160405290816000820160009054906101000a900460ff16600381111561136a57611369611671565b5b600381111561137c5761137b611671565b5b8152602001600182015481526020016002820160009054906101000a900460ff161515151581525050611478565b905060018260020160006101000a81548160ff021916908315150217905550600081111561141a573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611418573d6000803e3d6000fd5b505b3373ffffffffffffffffffffffffffffffffffffffff167fec68461f5d4cc45c89e914cb8826a966c73dd35e5f97815ece0a01ffa4a025a682604051611460919061154a565b60405180910390a25050565b60075481565b60035481565b600060038081111561148d5761148c611671565b5b600460149054906101000a900460ff1660038111156114af576114ae611671565b5b036114c0578160200151905061152c565b6000600160038111156114d6576114d5611671565b5b600460149054906101000a900460ff1660038111156114f8576114f7611671565b5b1461150557600954611509565b6008545b905080836020015160075461151e9190611ff2565b6115289190612063565b9150505b919050565b6000819050919050565b61154481611531565b82525050565b600060208201905061155f600083018461153b565b92915050565b600080fd5b6004811061157757600080fd5b50565b6000813590506115898161156a565b92915050565b6000602082840312156115a5576115a4611565565b5b60006115b38482850161157a565b91505092915050565b6115c581611531565b81146115d057600080fd5b50565b6000813590506115e2816115bc565b92915050565b6000602082840312156115fe576115fd611565565b5b600061160c848285016115d3565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061164082611615565b9050919050565b61165081611635565b82525050565b600060208201905061166b6000830184611647565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600481106116b1576116b0611671565b5b50565b60008190506116c2826116a0565b919050565b60006116d2826116b4565b9050919050565b6116e2816116c7565b82525050565b60006020820190506116fd60008301846116d9565b92915050565b600061170e82611615565b9050919050565b61171e81611703565b811461172957600080fd5b50565b60008135905061173b81611715565b92915050565b60006020828403121561175757611756611565565b5b60006117658482850161172c565b91505092915050565b60008115159050919050565b6117838161176e565b82525050565b600060608201905061179e60008301866116d9565b6117ab602083018561153b565b6117b8604083018461177a565b949350505050565b600081519050919050565b600082825260208201905092915050565b60005b838110156117fa5780820151818401526020810190506117df565b60008484015250505050565b6000601f19601f8301169050919050565b6000611822826117c0565b61182c81856117cb565b935061183c8185602086016117dc565b61184581611806565b840191505092915050565b6000602082019050818103600083015261186a8184611817565b905092915050565b61187b81611703565b82525050565b600061012082019050818103600083015261189c818c611817565b905081810360208301526118b0818b611817565b90506118bf604083018a61153b565b6118cc6060830189611872565b6118d960808301886116d9565b6118e660a083018761153b565b6118f360c083018661153b565b61190060e083018561153b565b61190e61010083018461153b565b9a9950505050505050505050565b7f42657420616d6f756e74206d7573742062652067726561746572207468616e2060008201527f7a65726f00000000000000000000000000000000000000000000000000000000602082015250565b60006119786024836117cb565b91506119838261191c565b604082019050919050565b600060208201905081810360008301526119a78161196b565b9050919050565b7f4d61746368206861732066696e69736865640000000000000000000000000000600082015250565b60006119e46012836117cb565b91506119ef826119ae565b602082019050919050565b60006020820190508181036000830152611a13816119d7565b9050919050565b7f496e76616c6964207465616d0000000000000000000000000000000000000000600082015250565b6000611a50600c836117cb565b9150611a5b82611a1a565b602082019050919050565b60006020820190508181036000830152611a7f81611a43565b9050919050565b7f596f75206861766520616c726561647920706c61636564206120626574000000600082015250565b6000611abc601d836117cb565b9150611ac782611a86565b602082019050919050565b60006020820190508181036000830152611aeb81611aaf565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611b2c82611531565b9150611b3783611531565b9250828201905080821115611b4f57611b4e611af2565b5b92915050565b6000604082019050611b6a60008301856116d9565b611b77602083018461153b565b9392505050565b7f596f75206d75737420706c61636520612062657420746f20726174652074686560008201527f206f7267616e697a657200000000000000000000000000000000000000000000602082015250565b6000611bda602a836117cb565b9150611be582611b7e565b604082019050919050565b60006020820190508181036000830152611c0981611bcd565b9050919050565b7f526174696e67206d757374206265206265747765656e203120616e6420350000600082015250565b6000611c46601e836117cb565b9150611c5182611c10565b602082019050919050565b60006020820190508181036000830152611c7581611c39565b9050919050565b6000819050919050565b6000611ca1611c9c611c9784611615565b611c7c565b611615565b9050919050565b6000611cb382611c86565b9050919050565b6000611cc582611ca8565b9050919050565b611cd581611cba565b82525050565b6000604082019050611cf06000830185611ccc565b611cfd602083018461153b565b9392505050565b7f4f6e6c79206f7267616e697a65722063616e20706572666f726d20746869732060008201527f6f7065726174696f6e0000000000000000000000000000000000000000000000602082015250565b6000611d606029836117cb565b9150611d6b82611d04565b604082019050919050565b60006020820190508181036000830152611d8f81611d53565b9050919050565b7f4e6577206b69636b6f66662074696d65206d75737420626520696e207468652060008201527f6675747572650000000000000000000000000000000000000000000000000000602082015250565b6000611df26026836117cb565b9150611dfd82611d96565b604082019050919050565b60006020820190508181036000830152611e2181611de5565b9050919050565b7f43616e6e6f7420757064617465206b69636b6f66662074696d6520616674657260008201527f20726573756c74206973206465636c6172656400000000000000000000000000602082015250565b6000611e846033836117cb565b9150611e8f82611e28565b604082019050919050565b60006020820190508181036000830152611eb381611e77565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611f0157607f821691505b602082108103611f1457611f13611eba565b5b50919050565b7f496e76616c696420726573756c74000000000000000000000000000000000000600082015250565b6000611f50600e836117cb565b9150611f5b82611f1a565b602082019050919050565b60006020820190508181036000830152611f7f81611f43565b9050919050565b7f526573756c742068617320616c7265616479206265656e206465636c61726564600082015250565b6000611fbc6020836117cb565b9150611fc782611f86565b602082019050919050565b60006020820190508181036000830152611feb81611faf565b9050919050565b6000611ffd82611531565b915061200883611531565b925082820261201681611531565b9150828204841483151761202d5761202c611af2565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061206e82611531565b915061207983611531565b92508261208957612088612034565b5b828204905092915050565b600061209f82611531565b91506120aa83611531565b92508282039050818111156120c2576120c1611af2565b5b92915050565b7f4d61746368206973206e6f742066696e69736865640000000000000000000000600082015250565b60006120fe6015836117cb565b9150612109826120c8565b602082019050919050565b6000602082019050818103600083015261212d816120f1565b9050919050565b7f5061796f757420616c726561647920636c61696d656400000000000000000000600082015250565b600061216a6016836117cb565b915061217582612134565b602082019050919050565b600060208201905081810360008301526121998161215d565b9050919050565b7f417474656d7074656420746f20636c61696d206c6f7374206265740000000000600082015250565b60006121d6601b836117cb565b91506121e1826121a0565b602082019050919050565b60006020820190508181036000830152612205816121c9565b905091905056fea2646970667358221220dc678229bbba225a6bd483ba74d4daf1a2b7eee3281927d911749a6e7713a1d564736f6c63430008180033";

type GameBetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameBetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameBet__factory extends ContractFactory {
  constructor(...args: GameBetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _home: string,
    _away: string,
    _kickOffTime: BigNumberish,
    _organizer: AddressLike,
    _factory: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _home,
      _away,
      _kickOffTime,
      _organizer,
      _factory,
      overrides || {}
    );
  }
  override deploy(
    _home: string,
    _away: string,
    _kickOffTime: BigNumberish,
    _organizer: AddressLike,
    _factory: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _home,
      _away,
      _kickOffTime,
      _organizer,
      _factory,
      overrides || {}
    ) as Promise<
      GameBet & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): GameBet__factory {
    return super.connect(runner) as GameBet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameBetInterface {
    return new Interface(_abi) as GameBetInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): GameBet {
    return new Contract(address, _abi, runner) as unknown as GameBet;
  }
}
