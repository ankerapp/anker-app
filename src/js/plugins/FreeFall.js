export default class FreeFall {

    constructor(config) {
        this.dataAttributes = {
            trigger: 'data-dropdown-trigger',
            closer: 'data-dropdown-close',
            id: 'data-dropdown-id'
        };

        this.options = {
            showDropdownCSS: 'show-dd-container',
            dataAttributes: this.dataAttributes
        }

        if (typeof config === 'object') {
            this.options = { ...this.options, ...config };
        }

        this.triggerDataAtt = this.options.dataAttributes.trigger;
        this.closerDataAtt = this.options.dataAttributes.closer;
        this.ddDataAtt = this.options.dataAttributes.id;

        this.currentDD = '';

        this.init();
    }

    init() {
        this.setTriggers();
        this.setClosers();
    }

    /** Sets and adds event listeners to triggers */
    setTriggers() {
        const triggers = document.querySelectorAll(`[${this.triggerDataAtt}]`);

        if (triggers.length > 0) {
            triggers.forEach((trigger) => {
                trigger.addEventListener('click', (event) => {
                    event.preventDefault();
                    // ddID = dropdownID
                    const ddID = event.target.getAttribute(`${this.triggerDataAtt}`);
                    this.drop({ ddID: ddID });
                });
            });
        }
    }

    /** Sets and adds event listeners to close buttons */
    setClosers() {
        const closeButtons = document.querySelectorAll(`[${this.closerDataAtt}]`);

        if (closeButtons.length > 0) {
            closeButtons.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const ddID = event.target.getAttribute(`${this.closerDataAtt}`);
                    this.roll({ ddID: ddID });
                })
            })
        }
    }

    /**
     * Opens dropdown container - drops it down
     *
     * @param {Object} Object.ddID The dropdown container ID
     */
    drop({ ddID }) {
        const ddContainer = document.querySelector(`[${this.ddDataAtt}=${ddID}]`);

        if (this.currentDD.length > 0) this.roll({ ddID: this.currentDD });

        this.handleCustomEvents({ type: 'beforeDrop', ddContainer });
        ddContainer.classList.add(this.options.showDropdownCSS);
        this.currentDD = ddID;
        this.handleCustomEvents({ type: 'afterDrop', ddContainer });
    }

    /**
     * Closes dropdown container - rolls it up
     *
     * @param {Object} Object.ddID The dropdown container ID
     */
    roll({ ddID }) {
        const ddContainer = document.querySelector(`[${this.ddDataAtt}=${ddID}]`);

        this.handleCustomEvents({ type: 'beforeRoll', ddContainer });
        ddContainer.classList.remove(this.options.showDropdownCSS);
        this.currentDD = '';
        this.handleCustomEvents({ type: 'afterRoll', ddContainer });
    }

    handleCustomEvents({ type, ddContainer }) {
        const event = new CustomEvent(type, { bubbles: true, detail: ddContainer });
        ddContainer.dispatchEvent(event);
    }

}
