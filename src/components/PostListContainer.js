import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import PostItem from './PostItem';
import FilterTags from './FilterTags';
import PostFilterBar from './PostFilterBar';

const MockPost = {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false,
        "commentCount": 2
    };

const MockCategories = [
        {
            "name": "react",
            "path": "react"
        },
        {
            "name": "redux",
            "path": "redux"
        },
        {
            "name": "udacity",
            "path": "udacity"
        }
    ];

class PostListContainer extends Component {

    onShowDetail = (postId) => alert('show all')

    onUpVote = (postId) => alert('vote up')

    onDownVote = (postId) => alert('vote down')

    render() {
        return (
           <Grid fluid style={{marginTop : '10px'}}>
                <Row>
                    <Col md={12}>
                        <PostFilterBar />
                    </Col>
                </Row>
                
                <Row style={{marginTop : '10px'}}>
                    <Col md={9}>
                        <PostItem post={MockPost} onShowDetail={this.onShowDetail} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                        <PostItem post={MockPost} onShowDetail={this.onShowDetail} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                    </Col>

                    <Col md={3}>
                        <FilterTags categories={MockCategories} />
                    </Col>
                </Row>
           </Grid>
        )
    }
}

export default PostListContainer;