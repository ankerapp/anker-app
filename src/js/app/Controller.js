import Model from './Model';
import View from './View';

class Controller {

    constructor() {
        this.controlView();
    }

    async controlView() {
        try {
            View.renderSpinner();
            await Model.loadData();
            View.render(Model.state.data); // Model.state.data
        } catch(err) {
            throw err;
        }
    }

}

export default new Controller();
