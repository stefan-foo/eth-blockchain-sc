// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameBet {
    string public home;
    string public away;
    uint256 public kickoffTime;
    address public organizer;
    Outcome public result;
    mapping(address => Bet) public bets;
    address[] public betters;
    uint public totalPool;
    uint public totalBetHome;
    uint public totalBetAway;

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
    event KickoffTimeUpdated(uint newKickoffTime);

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Only organizer can call this");
        _;
    }

    constructor(
        string memory _home,
        string memory _away,
        uint _kickoffTime,
        address _organizer
    ) {
        home = _home;
        away = _away;
        kickoffTime = _kickoffTime;
        organizer = _organizer;
        result = Outcome.Open;
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

        betters.push(msg.sender);
        totalPool += msg.value;

        if (pick == Outcome.Home) {
            totalBetHome += msg.value;
        } else {
            totalBetAway += msg.value;
        }

        emit BetPlaced(msg.sender, pick, msg.value);
    }

    function resolve(Outcome _result) public onlyOrganizer {
        require(result != Outcome.Open, "Result has already been declared");
        require(
            _result == Outcome.Home ||
                _result == Outcome.Away ||
                _result == Outcome.Draw,
            "Invalid result"
        );

        result = _result;

        emit ResultDeclared(_result);
    }

    function claimPayout() public {
        require(result == Outcome.Open, "Match is not finished");
        require(!bets[msg.sender].hasClaimed, "Payout already claimed");

        Bet storage bet = bets[msg.sender];
        uint payout = 0;

        if (result == Outcome.Draw) {
            payout = bet.amount;
        } else if (result == bet.team) {
            if (result == Outcome.Home) {
                payout = (((totalPool * 95) / 100) * bet.amount) / totalBetHome;
            } else if (result == Outcome.Away) {
                payout = (((totalPool * 95) / 100) * bet.amount) / totalBetAway;
            }
        }

        bet.hasClaimed = true;

        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }

        emit PayoutClaimed(msg.sender, payout);
    }

    function updateKickoffTime(uint256 _newKickoffTime) public onlyOrganizer {
        require(
            result != Outcome.Open,
            "Cannot update kickoff time after result is declared"
        );
        kickoffTime = _newKickoffTime;
        emit KickoffTimeUpdated(_newKickoffTime);
    }

    function rateOrganizer(uint rating) public {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
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
            uint
        )
    {
        return (
            home,
            away,
            kickoffTime,
            organizer,
            result,
            totalPool,
            totalBetHome,
            totalBetAway,
            betters.length
        );
    }
}
