var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],
    componentWillMount: function () {
        Actions.getImages(this.props.params.id)
    },
    getInitialState: function () {
        return {
            images: []
        }
    },
    render: function () {
        return (
            <div className="row">
                {this.renderImages()}
            </div>
        )
    },
    renderImages: function () {
        return this.state.images.slice(0, 12).map(function (image) {
            return <div className="col-sm-4 col-md-3">
            <h4>{image.title}</h4>
            <p><img src={image.link} className="img-responsive" /></p>
            </div>
        })
    },
    onChange: function (event, images) {
        this.setState({
            images: images
        })
    }
});