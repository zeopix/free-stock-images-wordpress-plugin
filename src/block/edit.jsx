import React from 'react';
const { PlainText } = wp.editor;

class BlockEdit extends React.Component {
    constructor(props) {
        super(props)
        this.loadImages = this.loadImages.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.loadImages()
    }

    loadImages () {
        console.log("Search Term:"+this.props.attributes.query)
    }

    render () {
        return (
            <div className={ this.props.className }>
                <PlainText
                    onChange={ query => this.props.setAttributes({ query: query }) }
                    value={ this.props.attributes.query }
                    placeholder="Search for images"
                    className="heading"
                    />
                <p>— Hello wordpress users.</p>
                <p>
                    <code>free-stock-images</code> is a guttenber created to make easier to process of looking for free stock pictures and embeding them into your wordpress gutenberg editor.
                </p>
                <p>
                    It was created via{ ' ' }
                    <code>
                        <a href="https://github.com/zeopix/wordpress-free-stock-images">
                            free-stock-images
                        </a>
                    </code>.
                </p>
            </div>
        )
    }
}
export default BlockEdit;
