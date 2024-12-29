/**
 * Block Editor Sidebar Auto-Open Script
 * 
 * Automatically opens the block settings sidebar when a block is clicked/selected.
 */

// Track the last selected block to prevent redundant actions
let lastSelectedBlockId = null;

wp.data.subscribe(() => {
    // Get the currently selected block
    const selectedBlock = wp.data.select('core/block-editor').getSelectedBlock();
    const sidebarOpen = wp.data.select('core/edit-post').isInserterOpened();

    if (selectedBlock && selectedBlock.clientId !== lastSelectedBlockId && !sidebarOpen) {
        // Update the last selected block ID
        lastSelectedBlockId = selectedBlock.clientId;

        // Open the block settings sidebar
        wp.data.dispatch("core/edit-post").openGeneralSidebar('edit-post/block');
    }

    // Reset if no block is selected
    if (!selectedBlock) {
        lastSelectedBlockId = null;
    }
});