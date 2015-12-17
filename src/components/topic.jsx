var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
    imagesPerPage: 20,
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
                <div>
                    {this.renderImages()}
                </div>
                <ul className="pagination">
                    {this.renderPagination()}
                </ul>
            </div>             
        )
    },
    renderImages: function () {
        var pageId = this.props.params.pageId || 1;
        var from = (pageId - 1) * this.imagesPerPage; // 0 * 20 = 0 | 2 * 20 = 40
        var to = from + this.imagesPerPage;     // 0 + 20 = 20 |

        return this.state.images.slice(from, to).map(function (image) {
            return <ImagePreview key={image.id} {...image} /> // this is the same as image={image}
        })
    },
    renderPagination: function(){
        var pages = Math.ceil(this.state.images.length / this.imagesPerPage);      
        var pagesList = [];
        for (var i = 0; i < pages; i++) {
            pagesList.push(
                <li className={this.props.params.pageId && this.props.params.pageId == (i + 1) ? 
                    "active" : !this.props.params.pageId && i == 0 ? "active" : "" }><Link to={"/topics/" + this.props.params.id + "/page/" + (i + 1)}>{i + 1}</Link></li>
            );
        };

        return pagesList;
    },
    onChange: function (event, images) {
        this.setState({
            images: images
        })
    }
});