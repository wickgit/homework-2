import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const fighterImage = createElement({
            tagName: 'img',
            attributes: {
                src: fighter.source,
                height: '200px'
            }
        });
        const { name, health, attack, defense } = fighter;
        const fighterInformation = Object.entries({
            name,
            health,
            attack,
            defense
        }).map(item => {
            const element = createElement({
                tagName: 'p',
                className: 'fighter-info__text'
            });
            element.textContent = `${item[0]}: ${item[1]}`;
            return element;
        });
        fighterElement.append(fighterImage, ...fighterInformation);
    }
    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
