import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const OUTCOME_OPEN = 0;
const OUTCOME_HOME = 1;
const OUTCOME_AWAY = 2;
const OUTCOME_DRAW = 3;
const HOME = "Home";
const AWAY = "Away";
const ONE_HOUR = 60 * 60;
const FIVE_MINUTES = 5 * 60;
const CURRENT_TIMESTAMP = Math.floor(Date.now() / 1000);
const ONE_HOUR_FTR_TIMESTAMP = CURRENT_TIMESTAMP + ONE_HOUR;

describe("GameBetFactory and GameBet Contracts", function () {
  async function deployContractsFixture() {
    const [booker, ...bettors] = await hre.ethers.getSigners();

    const gameBetFactory = await hre.ethers.deployContract("GameBetFactory");
    const gameBetFactoryAddress = await gameBetFactory.getAddress();

    const tx = await gameBetFactory.createGameBet(
      HOME,
      AWAY,
      ONE_HOUR_FTR_TIMESTAMP
    );
    const receipt = await tx.wait();

    const gameBetCreatedEvent = receipt?.logs.find(
      (log) => log.address === gameBetFactoryAddress
    );

    if (gameBetCreatedEvent && "args" in gameBetCreatedEvent) {
      const gameBet = await hre.ethers.getContractAt(
        "GameBet",
        gameBetCreatedEvent.args.gameBetAddress
      );
      return { gameBetFactory, gameBet, booker, bettors };
    }

    return { gameBetFactory, gameBet: null, booker, bettors };
  }

  describe("GameBetFactory Deployment and Functionality", function () {
    it("Should deploy GameBetFactory and create a GameBet contract", async function () {
      const { gameBetFactory, gameBet } = await loadFixture(
        deployContractsFixture
      );

      const openBets = await gameBetFactory.getOpenBets();
      expect(openBets).to.include(await gameBet?.getAddress());
    });

    it("Should set correct initial values for the created GameBet", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const [
        home,
        away,
        kickoffTime,
        actualOrganizer,
        outcome,
        totalPool,
        totalBetHome,
        totalBetAway,
        numOfbettors,
      ] = await gameBet.getContractDetails();

      expect(home).to.equal(HOME);
      expect(away).to.equal(AWAY);
      expect(kickoffTime).to.equal(ONE_HOUR_FTR_TIMESTAMP);
      expect(actualOrganizer).to.equal(booker.address);
      expect(outcome).to.equal(0);
      expect(totalPool).to.equal(0);
      expect(totalBetHome).to.equal(0);
      expect(totalBetAway).to.equal(0);
      expect(numOfbettors).to.equal(0);
    });
  });

  describe("GameBet Betting", function () {
    it("Should allow a user to place a bet", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const betAmount = hre.ethers.parseEther("1");

      await expect(
        gameBet.connect(bettor).placeBet(OUTCOME_HOME, { value: betAmount })
      )
        .to.emit(gameBet, "BetPlaced")
        .withArgs(bettor.address, OUTCOME_HOME, betAmount);
      const bet = await gameBet.bets(bettor.address);

      expect(bet.amount).to.equal(betAmount);
      expect(bet.team).to.equal(OUTCOME_HOME);
      expect(await gameBet.totalPool()).to.equal(betAmount);
    });

    it("Should not allow the same user to place multiple bets", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);
      const betAmount = hre.ethers.parseEther("1");

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet
        .connect(bettor)
        .placeBet(OUTCOME_AWAY, { value: betAmount });

      await expect(
        gameBet.connect(bettor).placeBet(OUTCOME_AWAY, { value: betAmount })
      ).to.be.revertedWith("You have already placed a bet");
    });

    it("Should revert if bet amount is zero", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await expect(
        gameBet.connect(bettor).placeBet(OUTCOME_AWAY, { value: 0 })
      ).to.be.revertedWith("Bet amount must be greater than zero");
    });
  });

  describe("GameBet Kickoff time adjustments", function () {
    it("Should not allow the organizer to update kickoff to the past", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const newKickoffTime = CURRENT_TIMESTAMP - FIVE_MINUTES;

      await expect(
        gameBet.connect(booker).updateKickOffTime(newKickoffTime)
      ).to.be.revertedWith("New kickoff time must be in the future");
    });

    it("Should allow the organizer to update kick off time before the result is declared", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const newKickOffTime = ONE_HOUR_FTR_TIMESTAMP + FIVE_MINUTES;
      await expect(gameBet.connect(booker).updateKickOffTime(newKickOffTime))
        .to.emit(gameBet, "KickOffTimeUpdated")
        .withArgs(newKickOffTime);

      expect(await gameBet.kickOffTime()).to.equal(newKickOffTime);
    });

    it("Should not allow updating kick off time for non organizers", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const newKickOffTime = ONE_HOUR_FTR_TIMESTAMP + FIVE_MINUTES;

      await expect(
        gameBet.connect(bettor).updateKickOffTime(newKickOffTime)
      ).to.be.revertedWith("Only organizer can perform this operation");
    });

    it("Should not allow updating kick off time after the result is declared", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const newKickOffTime = ONE_HOUR_FTR_TIMESTAMP + FIVE_MINUTES;

      await gameBet.connect(booker).resolve(OUTCOME_AWAY);
      await expect(
        gameBet.connect(booker).updateKickOffTime(newKickOffTime)
      ).to.be.revertedWith(
        "Cannot update kickoff time after result is declared"
      );
    });
  });

  describe("GameBet Resolving", function () {
    it("Should allow the booker to resolve the match", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await expect(gameBet.connect(booker).resolve(OUTCOME_AWAY))
        .to.emit(gameBet, "ResultDeclared")
        .withArgs(OUTCOME_AWAY);

      const result = await gameBet.result();
      expect(result).to.equal(OUTCOME_AWAY);
    });

    it("Should remove the resolved bet from openBets and add it to resolvedBets in GameBetFactory", async function () {
      const { gameBetFactory, gameBet, booker } = await loadFixture(
        deployContractsFixture
      );

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const gameBetAddress = await gameBet.getAddress();

      let openBets = await gameBetFactory.getOpenBets();
      expect(openBets).to.include(gameBetAddress);
      let resolvedBets = await gameBetFactory.getResolvedBets();
      expect(resolvedBets).to.not.include(gameBetAddress);

      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      openBets = await gameBetFactory.getOpenBets();
      resolvedBets = await gameBetFactory.getResolvedBets();

      expect(openBets).to.not.include(gameBetAddress);
      expect(resolvedBets).to.include(gameBetAddress);
    });

    it("Should not allow non-organizer to resolve the match", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await expect(
        gameBet.connect(bettor).resolve(OUTCOME_HOME)
      ).to.be.revertedWith("Only organizer can perform this operation");
    });

    it("Should not allow revision of bet outcome", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      await expect(
        gameBet.connect(booker).resolve(OUTCOME_AWAY)
      ).to.be.revertedWith("Result has already been declared");
    });

    it("Should not allow revert to open outcome", async function () {
      const { gameBet, booker } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      await expect(
        gameBet.connect(booker).resolve(OUTCOME_OPEN)
      ).to.be.revertedWith("Invalid result");
    });
  });

  describe("GameBet Payout", function () {
    it("Should pay 5% fee to the organizer on resolve", async function () {
      const { gameBet, booker, bettors } = await loadFixture(
        deployContractsFixture
      );

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      for (let i = 0; i < bettors.length; i++) {
        const betAmount = hre.ethers.parseEther(`${(i % 3) + 1}`);

        await gameBet
          .connect(bettors[i])
          .placeBet(i % 2 == 0 ? OUTCOME_HOME : OUTCOME_AWAY, {
            value: betAmount,
          });
      }

      const totalPool = await gameBet.totalPool();

      const organizerBalanceBefore = await hre.ethers.provider.getBalance(
        booker
      );

      const resolveTx = await gameBet.connect(booker).resolve(OUTCOME_AWAY);
      const receipt = await resolveTx.wait();
      const gasCostOnResolve =
        (receipt?.gasUsed ?? 0n) * (receipt?.gasPrice ?? 0n);

      const organizerBalanceAfter = await hre.ethers.provider.getBalance(
        booker
      );

      const expectedFee = (totalPool * 5n) / 100n;
      const expectedBalanceAfter =
        organizerBalanceBefore + expectedFee - gasCostOnResolve;

      expect(organizerBalanceAfter).to.equal(expectedBalanceAfter);
    });

    it("Should allow a winning user to claim payout", async function () {
      const {
        gameBet,
        bettors: [bettor1, bettor2],
        booker,
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const betAmount = hre.ethers.parseEther("1");

      await gameBet
        .connect(bettor1)
        .placeBet(OUTCOME_HOME, { value: betAmount });

      await gameBet
        .connect(bettor2)
        .placeBet(OUTCOME_AWAY, { value: betAmount });

      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      const initialBalance = await hre.ethers.provider.getBalance(
        bettor1.address
      );

      await gameBet.connect(bettor1).claimPayout();

      const finalBalance = await hre.ethers.provider.getBalance(
        bettor1.address
      );

      expect(finalBalance).to.be.above(initialBalance);
    });

    it("Shouldn't pay 5% fee to the organizer on Draw", async function () {
      const {
        gameBet,
        booker,
        bettors: [bettor1, bettor2],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet
        .connect(bettor1)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("1") });

      await gameBet
        .connect(bettor2)
        .placeBet(OUTCOME_AWAY, { value: hre.ethers.parseEther("2") });

      const organizerBalanceBefore = await hre.ethers.provider.getBalance(
        booker
      );

      const resolveTx = await gameBet.connect(booker).resolve(OUTCOME_DRAW);
      const receipt = await resolveTx.wait();
      const gasCostOnResolve =
        (receipt?.gasUsed ?? 0n) * (receipt?.gasPrice ?? 0n);

      const organizerBalanceAfter = await hre.ethers.provider.getBalance(
        booker
      );

      expect(organizerBalanceAfter).to.equal(
        organizerBalanceBefore - gasCostOnResolve
      );
    });

    it("Should not allow a losing user to claim payout", async function () {
      const {
        gameBet,
        bettors: [bettor1, bettor2],
        booker,
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const betAmount = hre.ethers.parseEther("1");

      await gameBet
        .connect(bettor1)
        .placeBet(OUTCOME_HOME, { value: betAmount });
      await gameBet
        .connect(bettor2)
        .placeBet(OUTCOME_AWAY, { value: betAmount });
      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      await expect(gameBet.connect(bettor2).claimPayout()).to.be.revertedWith(
        "Attempted to claim lost bet"
      );
    });

    it("Should allow bettors to withdraw funds from drawn match", async function () {
      const {
        gameBet,
        bettors: [bettor1, bettor2],
        booker,
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const betAmountBettor1 = hre.ethers.parseEther("1");
      const betAmountBettor2 = hre.ethers.parseEther("2");

      await gameBet
        .connect(bettor1)
        .placeBet(OUTCOME_HOME, { value: betAmountBettor1 });
      await gameBet
        .connect(bettor2)
        .placeBet(OUTCOME_AWAY, { value: betAmountBettor2 });

      await gameBet.connect(booker).resolve(OUTCOME_DRAW);

      await gameBet.connect(bettor1).claimPayout();
      await gameBet.connect(bettor2).claimPayout();
    });

    it("Should not allow a user to claim payout twice", async function () {
      const {
        gameBet,
        bettors: [bettor],
        booker,
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet
        .connect(bettor)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("1") });
      await gameBet.connect(booker).resolve(OUTCOME_HOME);

      await gameBet.connect(bettor).claimPayout();
      await expect(gameBet.connect(bettor).claimPayout()).to.be.revertedWith(
        "Payout already claimed"
      );
    });

    const testCases = [
      {
        bets: [
          { amount: "0.777", outcome: OUTCOME_AWAY },
          { amount: "0.445", outcome: OUTCOME_HOME },
          { amount: "0.000002", outcome: OUTCOME_HOME },
          { amount: "0.000008", outcome: OUTCOME_AWAY },
        ],
        resolveOutcome: OUTCOME_HOME,
      },
      {
        bets: [
          { amount: "1", outcome: OUTCOME_HOME },
          { amount: "2", outcome: OUTCOME_AWAY },
          { amount: "0.5", outcome: OUTCOME_HOME },
        ],
        resolveOutcome: OUTCOME_AWAY,
      },
      {
        bets: [
          { amount: "0.1", outcome: OUTCOME_HOME },
          { amount: "0.3", outcome: OUTCOME_AWAY },
          { amount: "0.2", outcome: OUTCOME_HOME },
        ],
        resolveOutcome: OUTCOME_HOME,
      },
      {
        bets: [
          { amount: "0.2", outcome: OUTCOME_AWAY },
          { amount: "1.5", outcome: OUTCOME_AWAY },
          { amount: "0.5", outcome: OUTCOME_HOME },
        ],
        resolveOutcome: OUTCOME_AWAY,
      },
      {
        bets: [
          { amount: "0.01444", outcome: OUTCOME_HOME },
          { amount: "0.01332", outcome: OUTCOME_AWAY },
        ],
        resolveOutcome: OUTCOME_HOME,
      },
    ];

    testCases.forEach(({ bets, resolveOutcome }) => {
      it(`Should compensate bettors and organizer on non-draw resolve with bets: ${bets
        .map((bet) => `${bet.amount} (${bet.outcome})`)
        .join(", ")}`, async function () {
        const { gameBet, booker, bettors } = await loadFixture(
          deployContractsFixture
        );

        if (!gameBet) {
          return expect(gameBet).to.not.be.null;
        }

        const betPromises = bets.map(({ amount, outcome }, index) =>
          gameBet
            .connect(bettors[index])
            .placeBet(outcome, { value: hre.ethers.parseEther(amount) })
        );

        await Promise.all(betPromises);

        const organizerBalanceBefore = await hre.ethers.provider.getBalance(
          booker
        );

        const totalPool = await gameBet.totalPool();

        const resolveTx = await gameBet.connect(booker).resolve(resolveOutcome);
        const receipt = await resolveTx.wait();
        const gasCostOnResolve =
          (receipt?.gasUsed ?? 0n) * (receipt?.gasPrice ?? 0n);

        const organizerBalanceAfter = await hre.ethers.provider.getBalance(
          booker
        );

        const expectedFee = (totalPool * 5n) / 100n;
        const expectedBalanceAfter =
          organizerBalanceBefore + expectedFee - gasCostOnResolve;

        expect(organizerBalanceAfter).to.equal(expectedBalanceAfter);

        for (let i = 0; i < bets.length; i++) {
          const bet = bets[i];
          const bettor = bettors[i];

          const initialBalance = await hre.ethers.provider.getBalance(bettor);

          if (bet.outcome == resolveOutcome) {
            const winnerPool = await (bet.outcome == OUTCOME_HOME
              ? gameBet.totalBetHome()
              : gameBet.totalBetAway());
            const winAmount =
              ((totalPool - expectedFee) * hre.ethers.parseEther(bet.amount)) /
              winnerPool;

            const tx = await gameBet.connect(bettor).claimPayout();
            const receipt = await tx.wait();
            const gasPrice =
              (receipt?.gasPrice ?? 0n) * (receipt?.gasUsed ?? 0n);

            const balanceAfter = await hre.ethers.provider.getBalance(
              bettor.address
            );

            expect(balanceAfter).to.equal(
              initialBalance - gasPrice + winAmount
            );
          } else {
            await expect(
              gameBet.connect(bettor).claimPayout()
            ).to.be.revertedWith("Attempted to claim lost bet");
          }
        }
      });
    });
  });

  describe("Rating organizers", function () {
    it("Should allow bettor to rate organizer", async function () {
      const {
        gameBetFactory,
        gameBet,
        booker,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const rating = 4;

      await gameBet
        .connect(bettor)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("2") });

      await gameBet.connect(bettor).rateOrganizer(rating);

      const organizerRating = await gameBetFactory.organizerRatings(
        booker.address
      );

      expect(organizerRating.totalRatings).to.equal(rating);
      expect(organizerRating.ratingCount).to.equal(1);
    });

    it("Should not allow non bettors to rate organizer", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await expect(gameBet.connect(bettor).rateOrganizer(4)).to.be.revertedWith(
        "You must place a bet to rate the organizer"
      );
    });

    it("Should not allow 2nd rating via same game bet", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet
        .connect(bettor)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("2") });

      await gameBet.connect(bettor).rateOrganizer(4);
      await expect(gameBet.connect(bettor).rateOrganizer(4)).to.be.revertedWith(
        "Organizer has already been rated for this bet"
      );
    });

    it("Should allow 2 users to rate bet", async function () {
      const {
        gameBet,
        gameBetFactory,
        booker,
        bettors: [bettor1, bettor2],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await gameBet
        .connect(bettor1)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("2") });

      await gameBet
        .connect(bettor2)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("2") });

      await gameBet.connect(bettor1).rateOrganizer(4);
      await gameBet.connect(bettor2).rateOrganizer(3);

      const ratings = await gameBetFactory.organizerRatings(booker);
      expect(ratings.ratingCount).to.be.equal(2);
      expect(ratings.totalRatings).to.be.equal(7);
    });

    it("Should not allow organizer to rate his bets", async function () {
      const {
        gameBet,
        booker,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      await expect(gameBet.connect(booker).rateOrganizer(4)).to.be.revertedWith(
        "Organizer can't rate his own bets"
      );
    });

    it("Should not allow ratings that are not between 1 and 5", async function () {
      const {
        gameBet,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      if (!gameBet) {
        return expect(gameBet).to.not.be.null;
      }

      const rating = 6;

      await gameBet
        .connect(bettor)
        .placeBet(OUTCOME_HOME, { value: hre.ethers.parseEther("2") });

      await expect(
        gameBet.connect(bettor).rateOrganizer(rating)
      ).to.be.revertedWith("Rating must be between 1 and 5");
    });

    it("Should not allow direct call to factory rate method", async function () {
      const {
        gameBetFactory,
        booker,
        bettors: [bettor],
      } = await loadFixture(deployContractsFixture);

      await expect(
        gameBetFactory.connect(bettor).saveRating(booker, 3)
      ).to.be.revertedWith("Caller is not an authorized GameBet contract");
    });
  });
});
