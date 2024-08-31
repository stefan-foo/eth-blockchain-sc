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
    nameOrSignature: "createGameBet" | "deployedMatches" | "getPossibleBets"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "GameBetCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "createGameBet",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deployedMatches",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPossibleBets",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createGameBet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployedMatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPossibleBets",
    data: BytesLike
  ): Result;
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

  deployedMatches: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getPossibleBets: TypedContractMethod<[], [string[]], "view">;

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
    nameOrSignature: "deployedMatches"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getPossibleBets"
  ): TypedContractMethod<[], [string[]], "view">;

  getEvent(
    key: "GameBetCreated"
  ): TypedContractEvent<
    GameBetCreatedEvent.InputTuple,
    GameBetCreatedEvent.OutputTuple,
    GameBetCreatedEvent.OutputObject
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
  };
}
