import React from 'react';
import PropTypes from 'prop-types';
import {resumeText} from '../helpers/StringHelper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import dateFormat from 'date-format';
import {withRouter} from 'react-router-dom';
import FaHandOUp from 'react-icons/lib/fa/hand-o-up';
import FaHandODown from 'react-icons/lib/fa/hand-o-down';
import FaEye from 'react-icons/lib/fa/eye';

const handUpIcon = <FaHandOUp />;
const handDownIcon = <FaHandODown />
const detailIcon = <FaEye />;

const PostItem = (props) => {

    const {post, onUpVote, onDownVote, history} = props;
    const postDate = new Date(post.timestamp);
    const subtitleMessage = `Date: ${dateFormat('dd-MM-yyyy hhhmm', postDate)} | Author: ${post.author} | Category: ${post.category} | Vote Score: ${post.voteScore} | Comments: ${post.commentCount}`
    const postDetailUrl = `/post/${post.id}`;

    return (
        <Card style={{marginBottom : '10px'}} zDepth={1}>
            <CardHeader
                title={post.title}
                subtitle={subtitleMessage}
                subtitleStyle={{marginTop : "8px", fontSize : "0.7em"}}
                actAsExpander={false}
                showExpandableButton={false}
            />
            <CardText expandable={false}>
                {resumeText(post.body, 150)}
            </CardText>
            <CardActions>
                <BottomNavigation>
                    <BottomNavigationItem
                        label="See full post"
                        icon={detailIcon}
                        onClick={() => history.push(postDetailUrl)}
                    />
                    <BottomNavigationItem
                        label="Up vote"
                        icon={handUpIcon}
                        onClick={() => {onUpVote(post.id)} }
                    />
                    <BottomNavigationItem
                        label="Down vote"
                        icon={handDownIcon}
                        onClick={() => {onDownVote(post.id)} }
                    />
                </BottomNavigation>
            </CardActions>
        </Card>
    );
}

PostItem.propTypes = {
    post : PropTypes.shape({
        id : PropTypes.string.isRequired,
        timestamp : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        body : PropTypes.string.isRequired,
        author : PropTypes.string.isRequired,
        category : PropTypes.string.isRequired,
        voteScore : PropTypes.number.isRequired,
        deleted : PropTypes.bool.isRequired,
        commentCount : PropTypes.number.isRequired
    }).isRequired,
    onUpVote : PropTypes.func, 
    onDownVote : PropTypes.func
}

export default withRouter(PostItem);