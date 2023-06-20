import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #fighterEndpoint = 'details/fighter/';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
        const fighterDetails = await callApi(`${this.#fighterEndpoint}/${id}.json`);
        return fighterDetails;
    }
}

const fighterService = new FighterService();

export default fighterService;
