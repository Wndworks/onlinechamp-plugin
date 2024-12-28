/**
 * Block Editor Enhancements Script
 * 
 * - Automatically opens the block settings sidebar when a block is selected.
 * - Ensures the sidebar only opens once per block selection to prevent redundant actions.
 * - Tracks the selected block using `clientId` for efficient state management.
 * - Integrates with WordPress APIs (`wp.data`) for seamless editor interaction.
 * - Optimized for performance in large or complex editors.
 */

// Track the last selected block to avoid repeated operations
let lastSelectedBlockId = null;

wp.data.subscribe(() => {
    // Get the currently selected block
    const selectedBlock = wp.data.select('core/block-editor').getSelectedBlock();

    // Check if the selected block has changed
    if (selectedBlock && selectedBlock.clientId !== lastSelectedBlockId) {
        lastSelectedBlockId = selectedBlock.clientId;

        // Check if the sidebar is already open
        const isSidebarOpen = wp.data.select("core/edit-post").isEditorPanelOpened("edit-post/block");

        if (!isSidebarOpen) {
            wp.data.dispatch("core/edit-post").openGeneralSidebar('edit-post/block'); // Open the Block settings panel
        }
    }

    // Reset if no block is selected
    if (!selectedBlock) {
        lastSelectedBlockId = null;
    }
});