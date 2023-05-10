export enum ArrowKeys {
    Up = 'ArrowUp',
    Down = 'ArrowDown',
    Right = 'ArrowRight',
    Left = 'ArrowLeft',
}

export type DigitColor = 'black' | 'red' | 'green' | 'grey';

export type TestSummary = {greenCount: number, redCount: number}

export type TimedTestSummary = TestSummary & {totalTime: string};

export type BestScore = {greenCount: number, totalTime: string}

export type TestPhase = 'new' | 'memo' | 'recall' | 'result' | 'summary';

export function getNextPhase(currentPhase: TestPhase): TestPhase {
    switch (currentPhase) {
      case 'new':
        return 'memo';
      case 'memo':
        return 'recall';
      case 'recall':
        return 'result';
      case 'result':
        return 'summary';
      case 'summary':
        return 'new';
      default:
        throw new Error('Test phase not recognized');
    }
  }