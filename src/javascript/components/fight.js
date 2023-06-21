import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    const power = fighter.attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    const defence = fighter.defense * dodgeChance;
    return defence;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const playerOne = {
            ...firstFighter,
            isBlocking: false,
            currentHealth: firstFighter.health,
            isCritReady: true
        };
        const playerTwo = {
            ...secondFighter,
            isBlocking: false,
            currentHealth: secondFighter.health,
            isCritReady: true
        };
        const playerOneHealthBar = document.querySelector('#left-fighter-indicator');
        const playerTwoHealthBar = document.querySelector('#right-fighter-indicator');

        window.addEventListener('keydown', e => {
            switch (e.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = true;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = true;
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', e => {
            switch (e.code) {
                case controls.PlayerOneAttack:
                    if (playerOne.isBlocking || playerTwo.isBlocking) break;
                    playerTwo.currentHealth -= getDamage(playerOne, playerTwo);
                    playerTwoHealthBar.style.width = `${(playerTwo.currentHealth / playerTwo.health) * 100}%`;
                    if (playerTwo.currentHealth <= 0) {
                        resolve(playerTwo);
                    }
                    break;
                case controls.PlayerTwoAttack:
                    if (playerTwo.isBlocking || playerOne.isBlocking) break;
                    playerOne.currentHealth -= getDamage(playerOne, playerTwo);
                    playerOneHealthBar.style.width = `${(playerOne.currentHealth / playerOne.health) * 100}%`;
                    if (playerOne.currentHealth <= 0) {
                        resolve(playerOne);
                    }
                    break;
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = false;
                    break;
                default:
                    break;
            }
        });
    });
}
