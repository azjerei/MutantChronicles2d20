export class DiceRollResult {
    targetValue: number;
    numDice: number;
    difficulty: number;
    successes: number;
    hasRepercusions: boolean;
}

export class SpecialDiceRollResult {
    numDice: number;
    bonus: number;
    hits: number;
    special: number;
}

export class Roller {
    roll(targetValue: number, focus: number, difficulty: number, numDice?: number) {
        if (!numDice) {
            numDice = 2;
        }

        var result = new DiceRollResult();
        result.targetValue = targetValue;
        result.numDice = numDice;
        result.difficulty = difficulty;
        result.successes = 0;
        result.hasRepercusions = false;

        for (var i = 0; i < numDice; i++) {
            var roll = Math.floor(Math.random() * 20) + 1;
            if (roll <= targetValue) {
                result.successes++;

                if (roll <= focus) {
                    result.successes++;
                }
            }
            else {
                if (roll === 20) {
                    result.hasRepercusions = true;
                }
            }
        }

        return result;
    }

    rollSpecial(numDice: number, bonus: number) {
        var result = new SpecialDiceRollResult();
        result.numDice = numDice;
        result.bonus = bonus;
        result.hits = 0;
        result.special = 0;

        for (var i = 0; i < numDice; i++) {
            switch (Math.floor(Math.random() * 6) + 1) {
                case 1: result.hits++; break;
                case 2: result.hits += 2; break;
                case 3:
                case 4:
                case 5: break;
                case 6: result.special++; break;
            }
        }

        return result;
    }

    rollHitLocation() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
                return "head";
            case 3:
            case 4:
            case 5:
                return "right arm";
            case 6:
            case 7:
            case 8:
                return "left arm";
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                return "torso";
            case 15:
            case 16:
            case 17:
                return "right leg";
            case 18:
            case 19:
            case 20:
                return "left leg";
        }
    }
}

export const DiceRoller = new Roller();