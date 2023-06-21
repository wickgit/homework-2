import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const img = createElement({
        tagName: 'img',
        attributes: {
            src: fighter.source
        }
    });
    showModal({
        title: `Winner: ${fighter.name}`,
        bodyElement: img
    });
}
