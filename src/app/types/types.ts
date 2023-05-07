export enum ArrowKeys {
    Up = 'ArrowUp',
    Down = 'ArrowDown',
    Right = 'ArrowRight',
    Left = 'ArrowLeft',
}

export type TestPhase = 'new' | 'memo' | 'recall' | 'summary';

export function getNextPhase(currentPhase: TestPhase): TestPhase {
    switch (currentPhase) {
      case 'new':
        return 'memo';
      case 'memo':
        return 'recall';
      case 'recall':
        return 'summary';
      case 'summary':
        return 'new';
      default:
        throw new Error('Test phase not recognized');
    }
  }