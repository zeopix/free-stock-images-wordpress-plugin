import './editor.scss';
import './style.scss';
import BlockEdit from './components/edit.jsx';
import BlockSave from './components/save.jsx';

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ig/block-free-stock-images', {

	title: __( 'Free Stock Image' ), // Block title.
	icon: 'images-alt2',
	category: 'common',
	keywords: [
		__( 'giphy, pixabay, unsplash free stock image' )
	],

    attributes: {
        query: {
            type: 'string',
            default: ''
        },
        image: {
            type: 'string',
            default: ''
        },
    },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: BlockEdit,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: BlockSave,

    transforms: {
        to: [
            {
                type: "block",
                blocks: ["core/image"],
                transform: (attributes) => createBlock("core/image", {
						url: attributes.image
					}),
            }
        ]
    }
} );
