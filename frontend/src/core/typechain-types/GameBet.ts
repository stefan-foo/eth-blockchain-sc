/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace GameBet {
  export type BetStruct = {
    team: BigNumberish;
    amount: BigNumberish;
    hasClaimed: boolean;
  };

  export type BetStructOutput = [
    team: bigint,
    amount: bigint,
    hasClaimed: boolean
  ] & { team: bigint; amount: bigint; hasClaimed: boolean };
}

export interface GameBetInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "away"
      | "bets"
      | "bettors"
      | "claimPayout"
      | "getContractDetails"
      | "home"
      | "kickOffTime"
      | "organizer"
      | "placeBet"
      | "rateOrganizer"
      | "resolve"
      | "resolvedTimestamp"
      | "result"
      | "totalBetAway"
      | "totalBetHome"
      | "totalPool"
      | "updateKickOffTime"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "BetPlaced"
      | "KickOffTimeUpdated"
      | "MatchFinished"
      | "ResultDeclared"
  ): EventFragment;

  encodeFunctionData(functionFragment: "away", values?: undefined): string;
  encodeFunctionData(functionFragment: "bets", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "bettors",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimPayout",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractDetails",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "home", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "kickOffTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "organizer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rateOrganizer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "resolve",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "resolvedTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "result", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalBetAway",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalBetHome",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "totalPool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateKickOffTime",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "away", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bettors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimPayout",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "home", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "kickOffTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "organizer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeBet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rateOrganizer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resolvedTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "result", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalBetAway",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalBetHome",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateKickOffTime",
    data: BytesLike
  ): Result;
}

export namespace BetPlacedEvent {
  export type InputTuple = [
    better: AddressLike,
    team: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [better: string, team: bigint, amount: bigint];
  export interface OutputObject {
    better: string;
    team: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KickOffTimeUpdatedEvent {
  export type InputTuple = [newKickOffTime: BigNumberish];
  export type OutputTuple = [newKickOffTime: bigint];
  export interface OutputObject {
    newKickOffTime: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MatchFinishedEvent {
  export type InputTuple = [matchAddress: AddressLike, organizer: AddressLike];
  export type OutputTuple = [matchAddress: string, organizer: string];
  export interface OutputObject {
    matchAddress: string;
    organizer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ResultDeclaredEvent {
  export type InputTuple = [result: BigNumberish];
  export type OutputTuple = [result: bigint];
  export interface OutputObject {
    result: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface GameBet extends BaseContract {
  connect(runner?: ContractRunner | null): GameBet;
  waitForDeployment(): Promise<this>;

  interface: GameBetInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  away: TypedContractMethod<[], [string], "view">;

  bets: TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, bigint, boolean] & {
        team: bigint;
        amount: bigint;
        hasClaimed: boolean;
      }
    ],
    "view"
  >;

  bettors: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  claimPayout: TypedContractMethod<[], [void], "nonpayable">;

  getContractDetails: TypedContractMethod<
    [],
    [
      [
        string,
        string,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        GameBet.BetStructOutput
      ]
    ],
    "view"
  >;

  home: TypedContractMethod<[], [string], "view">;

  kickOffTime: TypedContractMethod<[], [bigint], "view">;

  organizer: TypedContractMethod<[], [string], "view">;

  placeBet: TypedContractMethod<[pick: BigNumberish], [void], "payable">;

  rateOrganizer: TypedContractMethod<
    [rating: BigNumberish],
    [void],
    "nonpayable"
  >;

  resolve: TypedContractMethod<[_result: BigNumberish], [void], "nonpayable">;

  resolvedTimestamp: TypedContractMethod<[], [bigint], "view">;

  result: TypedContractMethod<[], [bigint], "view">;

  totalBetAway: TypedContractMethod<[], [bigint], "view">;

  totalBetHome: TypedContractMethod<[], [bigint], "view">;

  totalPool: TypedContractMethod<[], [bigint], "view">;

  updateKickOffTime: TypedContractMethod<
    [_newKickOffTime: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "away"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "bets"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, bigint, boolean] & {
        team: bigint;
        amount: bigint;
        hasClaimed: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "bettors"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "claimPayout"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getContractDetails"
  ): TypedContractMethod<
    [],
    [
      [
        string,
        string,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        GameBet.BetStructOutput
      ]
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "home"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "kickOffTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "organizer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "placeBet"
  ): TypedContractMethod<[pick: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "rateOrganizer"
  ): TypedContractMethod<[rating: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "resolve"
  ): TypedContractMethod<[_result: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "resolvedTimestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "result"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalBetAway"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalBetHome"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalPool"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "updateKickOffTime"
  ): TypedContractMethod<[_newKickOffTime: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "BetPlaced"
  ): TypedContractEvent<
    BetPlacedEvent.InputTuple,
    BetPlacedEvent.OutputTuple,
    BetPlacedEvent.OutputObject
  >;
  getEvent(
    key: "KickOffTimeUpdated"
  ): TypedContractEvent<
    KickOffTimeUpdatedEvent.InputTuple,
    KickOffTimeUpdatedEvent.OutputTuple,
    KickOffTimeUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "MatchFinished"
  ): TypedContractEvent<
    MatchFinishedEvent.InputTuple,
    MatchFinishedEvent.OutputTuple,
    MatchFinishedEvent.OutputObject
  >;
  getEvent(
    key: "ResultDeclared"
  ): TypedContractEvent<
    ResultDeclaredEvent.InputTuple,
    ResultDeclaredEvent.OutputTuple,
    ResultDeclaredEvent.OutputObject
  >;

  filters: {
    "BetPlaced(address,uint8,uint256)": TypedContractEvent<
      BetPlacedEvent.InputTuple,
      BetPlacedEvent.OutputTuple,
      BetPlacedEvent.OutputObject
    >;
    BetPlaced: TypedContractEvent<
      BetPlacedEvent.InputTuple,
      BetPlacedEvent.OutputTuple,
      BetPlacedEvent.OutputObject
    >;

    "KickOffTimeUpdated(uint256)": TypedContractEvent<
      KickOffTimeUpdatedEvent.InputTuple,
      KickOffTimeUpdatedEvent.OutputTuple,
      KickOffTimeUpdatedEvent.OutputObject
    >;
    KickOffTimeUpdated: TypedContractEvent<
      KickOffTimeUpdatedEvent.InputTuple,
      KickOffTimeUpdatedEvent.OutputTuple,
      KickOffTimeUpdatedEvent.OutputObject
    >;

    "MatchFinished(address,address)": TypedContractEvent<
      MatchFinishedEvent.InputTuple,
      MatchFinishedEvent.OutputTuple,
      MatchFinishedEvent.OutputObject
    >;
    MatchFinished: TypedContractEvent<
      MatchFinishedEvent.InputTuple,
      MatchFinishedEvent.OutputTuple,
      MatchFinishedEvent.OutputObject
    >;

    "ResultDeclared(uint8)": TypedContractEvent<
      ResultDeclaredEvent.InputTuple,
      ResultDeclaredEvent.OutputTuple,
      ResultDeclaredEvent.OutputObject
    >;
    ResultDeclared: TypedContractEvent<
      ResultDeclaredEvent.InputTuple,
      ResultDeclaredEvent.OutputTuple,
      ResultDeclaredEvent.OutputObject
    >;
  };
}
