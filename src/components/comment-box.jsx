var React = require('react');

module.exports = React.createClass({
    level: 0,
    render: function () {
        return (
            <ul className="list-group">
                {this.renderComments()}
            </ul>
        )
    },
    renderComments: function(){
        return this.props.comments.slice(0, 20).map(function(comment){
            return <li className="list-group-item comment-box" key={comment.id}>
                <span className="badge">{comment.ups}</span>
                <h5>{comment.author}</h5>
                {comment.comment}
            </li>
        });
    }
    // recursive function that displays child comments as well
    // TODO: set class name corresponding to the level of the comments
    // renderComments: function (comments) {
    //     this.level++;
    //     return comments.map(function (comment) {            
    //         return <div>
    //             <p className={"level-" + this.level}>{comment.comment}</p>
    //             {comment.children.length ? this.renderComments(comment.children) :  null }
    //         </div>
    //     }.bind(this));
    // }
});