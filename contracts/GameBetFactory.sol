// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GameBet.sol";

contract GameBetFactory {
    address[] public deployedMatches;

    event GameBetCreated(
        address gameBetAddress,
        string home,
        string away,
        uint kickoffTime
    );

    function createGameBet(
        string memory home,
        string memory away,
        uint kickoffTime
    ) public {
        GameBet newGameBet = new GameBet(home, away, kickoffTime, msg.sender);
        deployedMatches.push(address(newGameBet));
        emit GameBetCreated(address(newGameBet), home, away, kickoffTime);
    }

    function getPossibleBets() public view returns (address[] memory) {
        return deployedMatches;
    }
}
