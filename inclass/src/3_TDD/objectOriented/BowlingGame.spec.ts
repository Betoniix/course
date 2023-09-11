import { BowlingGame } from "./BowlingGame";

describe("Test Bowling Game Functionality", () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  it("worst game ever", () => {
    for (let i = 0; i < 20; i++) {
      game.roll(0);
    }

    expect(game.score()).toBe(0);
  });

  it("can Calculate only one pin score", () => {
    for (let i = 0; i < 20; i++) {
      game.roll(1);
    }

    expect(game.score()).toBe(20);
  });

  it("can calculate one Spare", () => {
    game.roll(5);
    game.roll(5);
    game.roll(3);

    for (let i = 0; i < 17; i++) {
      game.roll(0);
    }

    expect(game.score()).toBe(16);
  });

  it("can calculate one Strike", () => {
    game.roll(10);
    game.roll(1);
    game.roll(1);

    for (let i = 0; i < 16; i++) {
      game.roll(0);
    }

    expect(game.score()).toBe(14);
  });

  it("smells cheats around here (perfect game)", () => {
    const game = rollMany(12, 10);

    expect(game.score()).toBe(300);
  });
});

function rollMany(rolls: number, pins: number) {
  let game: BowlingGame = new BowlingGame();
  for (let i = 0; i < rolls; i++) {
    game.roll(pins);
  }

  return game;
}
