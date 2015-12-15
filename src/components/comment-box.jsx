var React = require('react');

module.exports = React.createClass({
    level: 0,
    render: function () {
        return (
            <div>
                I'm comment box
                {this.renderComments(this.props.comments)}
            </div>
        )
    },
    renderComments: function (comments) {
        this.level++;
        return comments.map(function (comment) {
            //console.log(comment)
            return <div>
                <p className={"level-" + this.level}>{comment.comment}</p>
                {comment.children.length ? this.renderComments(comment.children) :  null }
            </div>
        }.bind(this));
    }
});