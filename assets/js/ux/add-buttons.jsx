/**
 * Toggles between opening the Patterns sidebar and the Block settings sidebar.
 * - Opens the Patterns sidebar and first category if it's not already open.
 * - Closes the Patterns sidebar and opens the Block settings sidebar if the Patterns sidebar is open.
 */
function toggleSidebars() {
    const isPatternsTabActive = document.querySelector('.block-editor-tabbed-sidebar__tab[id*="pattern"][aria-selected="true"]') !== null;

    if (!isPatternsTabActive) {
        // Open inserter sidebar and Patterns tab with the first category
        wp.data.dispatch('core/edit-post').setIsInserterOpened(true);
        waitForElement('.block-editor-tabbed-sidebar__tab[id*="pattern"]', (patternsTab) => {
            patternsTab.click();
            waitForElement('.block-editor-inserter__category-tablist button', (firstTab) => {
                firstTab.click();
            }, 500);
        }, 200);
        wp.data.dispatch("core/edit-post").closeGeneralSidebar();
    } else {
        // Close Patterns sidebar and open Block settings sidebar
        waitForElement('.block-editor-tabbed-sidebar__close-button', (closeButton) => {
            closeButton.click();
            wp.data.dispatch("core/edit-post").openGeneralSidebar('edit-post/block');
        }, 200);
    }
}

function addContainerBlock() {
    var block = wp.blocks.createBlock('acf/container');

    wp.data.dispatch('core/block-editor').insertBlocks(block);

    // Close Patterns sidebar and open Block settings sidebar
    const isPatternsTabActive = document.querySelector('.block-editor-tabbed-sidebar__tab[id*="pattern"][aria-selected="true"]') !== null;
    if (isPatternsTabActive) {

        waitForElement('.block-editor-tabbed-sidebar__close-button', (closeButton) => {
            closeButton.click();
            wp.data.dispatch("core/edit-post").openGeneralSidebar('edit-post/block');
        }, 500);
    }
}

/**
 * Adds a "Patroon toevoegen" button to the editor.
 * - The button is positioned fixed at the bottom and toggles the sidebars on click.
 */
function addButton(text, className, clickFunction) {
    const container = document.querySelector('.interface-interface-skeleton__content');

    if (container) {

        // Create button if not already present
        if (!container.querySelector(`.${className}`)) {
            const createBtn = document.createElement('button');
            createBtn.className = `${className} components-button is-primary`;
            createBtn.innerHTML = `
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
                    <path d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"></path>
                </svg> ` + text;
            Object.assign(createBtn.style, {
                position: 'relative',
            });

            createBtn.addEventListener('click', clickFunction);

            const buttonsContainer = document.querySelector('.champ-buttons');

            //Place button inside buttons container or create container if it doesn't exist
            if(buttonsContainer) {
                buttonsContainer.appendChild(createBtn);
            } else {
                const createButtonsContainer = document.createElement('div');
                    createButtonsContainer.className = `champ-buttons`;
                    Object.assign(createButtonsContainer.style, {
                        position: 'sticky',
                        bottom: '0',
                        left: '0',
                        zIndex: '9999',
                        display: 'flex',
                        width: '100%',
                        gap: '10px',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        padding: '5px',
                        background: 'white',
                        borderTop: '1px solid #ddd'
                    });
                container.appendChild(createButtonsContainer);
            }
        }
    }
}

/**
 * Waits for an element to appear in the DOM and executes a callback.
 * - Retries at set intervals until the element is found or the timeout is reached.
 */
function waitForElement(selector, callback, interval = 200, timeout = 5000) {
    const startTime = Date.now();

    function check() {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else if (Date.now() - startTime < timeout) {
            setTimeout(check, interval);
        } else {
            //console.warn(`Element not found: ${selector}`);
        }
    }

    check();
}

/**
 * Subscribes to block editor changes and ensures the button is added when necessary.
 * - Adds the button whenever blocks are added or removed.
 */
const { getBlocks: getBlockList } = wp.data.select('core/block-editor');
let blockList = getBlockList().map((block) => block.clientId);

wp.data.subscribe(() => {
    const newBlockList = getBlockList().map((block) => block.clientId);
    const blockListChanged = newBlockList.length !== blockList.length;

    if (blockListChanged && newBlockList.length > 0) {
        addButton('Container toevoegen', 'champ-add-container', addContainerBlock);
        addButton('Patroon toevoegen', 'champ-add-pattern', toggleSidebars);
        blockList = newBlockList;
    } else if (blockList.length === 0) {
        addButton('Container toevoegen', 'champ-add-container', addContainerBlock);
        addButton('Patroon toevoegen', 'champ-add-pattern', toggleSidebars);
    }
});