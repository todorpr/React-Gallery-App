var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],
    componentWillMount: function () {
        Actions.getImages(this.props.params.id);
    },
    getInitialState: function () {
        return {
            images: []
        }
    },
    componentWillReceiveProps: function (nextProps) {
        Actions.getImages(nextProps.params.id);
    },
    render: function () {
        return (
            <div className="topic">
                {this.renderImages()}
            </div> 
        )
    },
    renderImages: function () {
        return this.state.images.slice(0, 20).map(function (image) {
            return <ImagePreview key={image.id} {...image} /> // this is the same as image={image}
        })
    },
    onChange: function (event, images) {
        this.setState({
            images: images
        })
    }
});