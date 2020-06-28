import React from 'react';

class BlockSave extends React.Component {
    render () {
        return (
            <div className={ this.props.className }>
                <img src={this.props.attributes.image} />
            </div>
        )
    }
}
export default BlockSave;
