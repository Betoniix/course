enum StrategyType {
  STANDARD,
  STRIKE,
  SPARE,
}

type CountResult = { increment: number; result: number };

interface BowlingStrategy {
  increment: number;
  calculate(rolls: number[], index: number): CountResult;
}

class StrikeStrategy implements BowlingStrategy {
  increment = 1;
  calculate(rolls: number[], index: number): CountResult {
    const result = rolls[index] + rolls[index + 1] + rolls[index + 2];
    return { result, increment: this.increment };
  }
}

class SpareStrategy implements BowlingStrategy {
  increment = 2;
  calculate(rolls: number[], index: number): CountResult {
    const result = rolls[index] + rolls[index + 1] + rolls[index + 2];

    return { result, increment: this.increment };
  }
}

class StandardStrategy implements BowlingStrategy {
  increment = 2;
  calculate(rolls: number[], index: number): CountResult {
    const result = rolls[index] + rolls[index + 1];

    return { result, increment: this.increment };
  }
}

const Strategies: Map<StrategyType, BowlingStrategy> = new Map();
Strategies.set(StrategyType.STANDARD, new StandardStrategy());
Strategies.set(StrategyType.SPARE, new SpareStrategy());
Strategies.set(StrategyType.STRIKE, new StrikeStrategy());

class Counter {
  private strategy: BowlingStrategy;
  private MAX_PINS = 10;
  private MAX_FRAMES = 10;

  count(rolls: number[]) {
    let finalScore = 0;
    let currentIndex = 0;

    for (let i = 0; i < this.MAX_FRAMES; i++) {
      this.strategy = Strategies.get(StrategyType.STANDARD);

      if (rolls[currentIndex] === this.MAX_PINS)
        this.strategy = Strategies.get(StrategyType.STRIKE);

      if (rolls[currentIndex] + rolls[currentIndex + 1] === this.MAX_PINS)
        this.strategy = Strategies.get(StrategyType.SPARE);

      const result = this.strategy.calculate(rolls, currentIndex);
      finalScore += result.result;
      console.log("score: ", finalScore);
      currentIndex += result.increment;
    }

    return finalScore;
  }
}

export class BowlingGame {
  private rolls: number[] = [];
  private counter: Counter = new Counter(); //Me dio flojera ponerlo en el constructor, un poco de acoplamiento no mata a nadie

  roll(pins: number) {
    this.rolls.push(pins);
  }

  score() {
    return this.counter.count(this.rolls);
  }
}
