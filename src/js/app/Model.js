import { API_URL } from '../config';
import { AJAX } from '../helpers';

class Model {

    state = {};

    async loadData() {
        try {
            const data = await AJAX(API_URL);
            this.state.data = data;
        } catch(err) {
            throw err;
        }
    }

}

export default new Model();
