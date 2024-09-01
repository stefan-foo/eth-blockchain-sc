// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GameBet.sol";

contract GameBetFactory {
    address[] public openBets;
    address[] public resolvedBets;
    mapping(address => bool) public deployedBets;

    struct OrganizerRating {
        uint totalRatings;
        uint ratingCount;
    }

    mapping(address => OrganizerRating) public organizerRatings;

    event GameBetCreated(
        address gameBetAddress,
        string home,
        string away,
        uint kickoffTime
    );

    event GameBetResolved(address gameBetAddress);

    modifier onlyDeployedGameBets() {
        require(
            deployedBets[msg.sender],
            "Caller is not an authorized GameBet contract"
        );
        _;
    }

    function createGameBet(
        string memory home,
        string memory away,
        uint kickoffTime
    ) public {
        GameBet newGameBet = new GameBet(
            home,
            away,
            kickoffTime,
            msg.sender,
            address(this)
        );
        address gameBetAddress = address(newGameBet);
        openBets.push(gameBetAddress);
        deployedBets[gameBetAddress] = true;
        emit GameBetCreated(gameBetAddress, home, away, kickoffTime);
    }

    function getOpenBets() public view returns (address[] memory) {
        return openBets;
    }

    function getResolvedBets() public view returns (address[] memory) {
        return resolvedBets;
    }

    function saveRating(address organizer, uint rating) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        OrganizerRating storage organizerRating = organizerRatings[organizer];
        organizerRating.totalRatings += rating;
        organizerRating.ratingCount++;
    }

    function markBetAsResolved() external onlyDeployedGameBets {
        address gameBetAddress = msg.sender;
        require(
            _removeFromOpenBets(gameBetAddress),
            "Bet not found in openBets"
        );

        resolvedBets.push(gameBetAddress);

        emit GameBetResolved(gameBetAddress);
    }

    function _removeFromOpenBets(
        address gameBetAddress
    ) private returns (bool) {
        for (uint i = 0; i < openBets.length; i++) {
            if (openBets[i] == gameBetAddress) {
                openBets[i] = openBets[openBets.length - 1];
                openBets.pop();
                return true;
            }
        }
        return false;
    }
}
