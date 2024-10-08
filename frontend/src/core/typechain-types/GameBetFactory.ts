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

export interface GameBetFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createGameBet"
      | "deployedBets"
      | "getOpenBets"
      | "getResolvedBets"
      | "markBetAsResolved"
      | "openBets"
      | "organizerRatings"
      | "resolvedBets"
      | "saveRating"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "GameBetCreated" | "GameBetResolved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createGameBet",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deployedBets",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getOpenBets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getResolvedBets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "markBetAsResolved",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "openBets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "organizerRatings",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolvedBets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "saveRating",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createGameBet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployedBets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOpenBets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getResolvedBets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "markBetAsResolved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "openBets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "organizerRatings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolvedBets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "saveRating", data: BytesLike): Result;
}

export namespace GameBetCreatedEvent {
  export type InputTuple = [
    gameBetAddress: AddressLike,
    home: string,
    away: string,
    kickoffTime: BigNumberish
  ];
  export type OutputTuple = [
    gameBetAddress: string,
    home: string,
    away: string,
    kickoffTime: bigint
  ];
  export interface OutputObject {
    gameBetAddress: string;
    home: string;
    away: string;
    kickoffTime: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameBetResolvedEvent {
  export type InputTuple = [gameBetAddress: AddressLike];
  export type OutputTuple = [gameBetAddress: string];
  export interface OutputObject {
    gameBetAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface GameBetFactory extends BaseContract {
  connect(runner?: ContractRunner | null): GameBetFactory;
  waitForDeployment(): Promise<this>;

  interface: GameBetFactoryInterface;

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

  createGameBet: TypedContractMethod<
    [home: string, away: string, kickoffTime: BigNumberish],
    [void],
    "nonpayable"
  >;

  deployedBets: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getOpenBets: TypedContractMethod<[], [string[]], "view">;

  getResolvedBets: TypedContractMethod<[], [string[]], "view">;

  markBetAsResolved: TypedContractMethod<[], [void], "nonpayable">;

  openBets: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  organizerRatings: TypedContractMethod<
    [arg0: AddressLike],
    [[bigint, bigint] & { totalRatings: bigint; ratingCount: bigint }],
    "view"
  >;

  resolvedBets: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  saveRating: TypedContractMethod<
    [organizer: AddressLike, rating: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createGameBet"
  ): TypedContractMethod<
    [home: string, away: string, kickoffTime: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deployedBets"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getOpenBets"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getResolvedBets"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "markBetAsResolved"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "openBets"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "organizerRatings"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [[bigint, bigint] & { totalRatings: bigint; ratingCount: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "resolvedBets"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "saveRating"
  ): TypedContractMethod<
    [organizer: AddressLike, rating: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "GameBetCreated"
  ): TypedContractEvent<
    GameBetCreatedEvent.InputTuple,
    GameBetCreatedEvent.OutputTuple,
    GameBetCreatedEvent.OutputObject
  >;
  getEvent(
    key: "GameBetResolved"
  ): TypedContractEvent<
    GameBetResolvedEvent.InputTuple,
    GameBetResolvedEvent.OutputTuple,
    GameBetResolvedEvent.OutputObject
  >;

  filters: {
    "GameBetCreated(address,string,string,uint256)": TypedContractEvent<
      GameBetCreatedEvent.InputTuple,
      GameBetCreatedEvent.OutputTuple,
      GameBetCreatedEvent.OutputObject
    >;
    GameBetCreated: TypedContractEvent<
      GameBetCreatedEvent.InputTuple,
      GameBetCreatedEvent.OutputTuple,
      GameBetCreatedEvent.OutputObject
    >;

    "GameBetResolved(address)": TypedContractEvent<
      GameBetResolvedEvent.InputTuple,
      GameBetResolvedEvent.OutputTuple,
      GameBetResolvedEvent.OutputObject
    >;
    GameBetResolved: TypedContractEvent<
      GameBetResolvedEvent.InputTuple,
      GameBetResolvedEvent.OutputTuple,
      GameBetResolvedEvent.OutputObject
    >;
  };
}
