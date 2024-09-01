// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GameBetFactory.sol";

contract GameBet {
    string public home;
    string public away;
    uint256 public kickOffTime;
    uint256 public resolvedTimestamp;
    address payable public organizer;
    Outcome public result;
    mapping(address => Bet) public bets;
    address payable[] public betters;
    uint public totalPool;
    uint public totalBetHome;
    uint public totalBetAway;
    GameBetFactory factory;

    enum Outcome {
        Open,
        Home,
        Away,
        Draw
    }

    struct Bet {
        Outcome team;
        uint amount;
        bool hasClaimed;
    }

    event BetPlaced(address indexed better, Outcome team, uint amount);
    event ResultDeclared(Outcome result);
    event PayoutClaimed(address indexed better, uint amount);
    event KickOffTimeUpdated(uint newKickOffTime);
    event MatchFinished(
        address indexed matchAddress,
        address indexed organizer
    );

    modifier onlyOrganizer() {
        require(
            msg.sender == organizer,
            "Only organizer can perform this operation"
        );
        _;
    }

    modifier betResolved() {
        require(result != Outcome.Open, "Match is not finished");
        _;
    }

    modifier validOutcome(Outcome _result) {
        require(
            _result == Outcome.Home ||
                _result == Outcome.Away ||
                _result == Outcome.Draw,
            "Invalid result"
        );
        _;
    }

    constructor(
        string memory _home,
        string memory _away,
        uint _kickOffTime,
        address _organizer,
        address _factory
    ) {
        require(
            _kickOffTime > block.timestamp,
            "Kick off time must be in the future"
        );
        home = _home;
        away = _away;
        kickOffTime = _kickOffTime;
        organizer = payable(_organizer);
        result = Outcome.Open;
        factory = GameBetFactory(_factory);
    }

    function placeBet(Outcome pick) public payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        require(result == Outcome.Open, "Match has finished");
        require(pick == Outcome.Home || pick == Outcome.Away, "Invalid team");

        Bet storage bet = bets[msg.sender];
        require(bet.amount == 0, "You have already placed a bet");

        bet.team = pick;
        bet.amount = msg.value;
        bet.hasClaimed = false;

        betters.push(payable(msg.sender));
        totalPool += msg.value;

        if (pick == Outcome.Home) {
            totalBetHome += msg.value;
        } else {
            totalBetAway += msg.value;
        }

        emit BetPlaced(msg.sender, pick, msg.value);
    }

    function resolve(
        Outcome _result
    ) public onlyOrganizer validOutcome(_result) {
        require(result == Outcome.Open, "Result has already been declared");

        result = _result;
        resolvedTimestamp = block.timestamp;

        if (result != Outcome.Draw) {
            uint organizerFee = (totalPool * 5) / 100;
            payable(organizer).transfer(organizerFee);
            totalPool -= organizerFee;
        }

        factory.markBetAsResolved();

        emit ResultDeclared(_result);
    }

    function claimPayout() public betResolved {
        Bet storage bet = bets[msg.sender];
        require(!bet.hasClaimed, "Payout already claimed");
        require(
            result == Outcome.Draw || result == bet.team,
            "Attempted to claim lost bet"
        );

        uint payout = calculatePayout(bet);

        bet.hasClaimed = true;

        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }

        emit PayoutClaimed(msg.sender, payout);
    }

    function getContractDetails()
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            address,
            Outcome,
            uint,
            uint,
            uint,
            uint,
            Bet memory
        )
    {
        return (
            home,
            away,
            kickOffTime,
            organizer,
            result,
            totalPool,
            totalBetHome,
            totalBetAway,
            betters.length,
            bets[msg.sender]
        );
    }

    function updateKickOffTime(uint256 _newKickOffTime) public onlyOrganizer {
        require(
            _newKickOffTime > block.timestamp,
            "New kickoff time must be in the future"
        );
        require(
            result == Outcome.Open,
            "Cannot update kickoff time after result is declared"
        );
        kickOffTime = _newKickOffTime;
        emit KickOffTimeUpdated(_newKickOffTime);
    }

    function rateOrganizer(uint rating) public {
        Bet storage bet = bets[msg.sender];
        require(bet.amount > 0, "You must place a bet to rate the organizer");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        factory.saveRating(organizer, rating);
    }

    function calculatePayout(Bet memory bet) private view returns (uint) {
        if (result == Outcome.Draw) {
            return bet.amount;
        }

        uint winnerPool = (result == Outcome.Home)
            ? totalBetHome
            : totalBetAway;
        return ((totalPool * bet.amount) / winnerPool);
    }
}
