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
        const keyPressed = new Set();

        window.addEventListener('keydown', e => {
            switch (e.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = true;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = true;
                    break;
                default:
                    if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                        keyPressed.add(e.code);
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                        keyPressed.add(e.code);
                    }
                    break;
            }
        });

        window.addEventListener('keyup', e => {
            switch (e.code) {
                case controls.PlayerOneAttack:
                    if (playerOne.isBlocking || playerTwo.isBlocking) break;
                    playerTwo.currentHealth -= getDamage(playerOne, playerTwo);
                    playerTwoHealthBar.style.width = `${
                        (playerTwo.currentHealth > 0 ? playerTwo.currentHealth / playerTwo.health : 0) * 100
                    }%`;
                    if (playerTwo.currentHealth <= 0) {
                        resolve(playerOne);
                    }
                    break;
                case controls.PlayerTwoAttack:
                    if (playerTwo.isBlocking || playerOne.isBlocking) break;
                    playerOne.currentHealth -= getDamage(playerOne, playerTwo);
                    playerOneHealthBar.style.width = `${
                        (playerOne.currentHealth > 0 ? playerOne.currentHealth / playerOne.health : 0) * 100
                    }%`;
                    if (playerOne.currentHealth <= 0) {
                        resolve(playerTwo);
                    }
                    break;
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = false;
                    break;
                default:
                    if (
                        controls.PlayerOneCriticalHitCombination.every(val => keyPressed.has(val)) &&
                        playerOne.isCritReady
                    ) {
                        // if all keys are pressed
                        playerTwo.currentHealth -= 2 * playerOne.attack;
                        playerTwoHealthBar.style.width = `${
                            (playerTwo.currentHealth > 0 ? playerTwo.currentHealth / playerTwo.health : 0) * 100
                        }%`;
                        playerOne.isCritReady = false;
                        setTimeout(() => {
                            playerOne.isCritReady = true;
                        }, 10000);
                        if (playerTwo.currentHealth <= 0) {
                            resolve(playerOne);
                        }
                    } else if (
                        controls.PlayerTwoCriticalHitCombination.every(val => keyPressed.has(val)) &&
                        playerTwo.isCritReady
                    ) {
                        // if all keys are pressed
                        playerOne.currentHealth -= 2 * playerTwo.attack;
                        playerOneHealthBar.style.width = `${
                            (playerOne.currentHealth > 0 ? playerOne.currentHealth / playerOne.health : 0) * 100
                        }%`;
                        playerTwo.isCritReady = false;
                        setTimeout(() => {
                            playerTwo.isCritReady = true;
                        }, 10000);
                        if (playerOne.currentHealth <= 0) {
                            resolve(playerTwo);
                        }
                    }
                    if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                        keyPressed.delete(e.code);
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                        keyPressed.delete(e.code);
                    }
                    break;
            }
        });
    });
}
