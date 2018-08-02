import { TDirection, TNextStep } from './game';


export function calcNextCell(
  direction: TDirection,
  currentCell: number,
  width: number,
  height: number
): TNextStep {
  const nextStep: TNextStep = {
    nextCell: 0,
    isTeleporting: false
  };
  
  switch (direction) {
    case 'left':
      nextStep.nextCell = currentCell - 1;
      if (currentCell % width === 0) {
        nextStep.nextCell = nextStep.nextCell + width;
        nextStep.isTeleporting = true;
      }
      break;
    case 'right':
      nextStep.nextCell = currentCell + 1;
      if (nextStep.nextCell % width === 0) {
        nextStep.nextCell = nextStep.nextCell - width;
        nextStep.isTeleporting = true;
      }
      break;
    case 'up':
      nextStep.nextCell = currentCell - width;
      if (nextStep.nextCell < 0) {
        nextStep.nextCell = currentCell + width * (height - 1);
        nextStep.isTeleporting = true;
      }
      break;
    case 'down':
      nextStep.nextCell = currentCell + width;
      if (nextStep.nextCell > width * height -1) {
        nextStep.nextCell = currentCell - width * (height - 1);
        nextStep.isTeleporting = true;
      }
      break;
  }
  
  return nextStep;
}

export function calcDirection(
  newDirection: TDirection,
  prevDirection: TDirection,
  snakePosition: number[]
): TDirection {
  if (((newDirection === 'left' && prevDirection === 'right')
    || (newDirection === 'right' && prevDirection === 'left')
    || (newDirection === 'up' && prevDirection === 'down')
    || (newDirection === 'down' && prevDirection === 'up')) && snakePosition.length > 1) { return prevDirection}
    
  return newDirection;
}

export function calcApplePosition(snakePosition: number[], width: number, height: number): number {
  const cellsQty: number = width * height;
  let result: number;
  
  do {
    result = Math.floor(Math.random() * cellsQty)
  } while (snakePosition.includes(result));
  
  return result;
}

export function calcIsDead(
  nextCell: number,
  snakePosition: number[],
  isTeleportingAllowed: boolean,
  isTeleporting: boolean
): boolean {
  return snakePosition.includes(nextCell) || (!isTeleportingAllowed && isTeleporting);
}
