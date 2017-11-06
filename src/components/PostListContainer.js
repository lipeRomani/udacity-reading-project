import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import PostItem from './PostItem';
import FilterTags from './FilterTags';
import PostFilterBar from './PostFilterBar';
import LinearProgress from 'material-ui/LinearProgress';
import sortBy from 'sort-by';
import {getSortString} from '../helpers/SortHelper';
import {
    addPost,
    addCategory,
    addFilterByCategory,
    clearFilterByCategory,
    changeSortBy,
    clearAlert
} from '../actions';
import {
    getAllPosts,
    getAllCategories,
    voteById,
    OPTION_UP_VOTE,
    OPTION_DOWN_VOTE
} from '../services/ApiService';
import isEmpty from 'is-empty';
import AlertContainer from 'react-alert';

class PostListContainer extends Component {

    state = {
        loadPosts : false,
        loadCategories : false
    }

    componentDidMount() {
        this._loadPosts();
        this._loadCategories();
        this._showAlertIfExists();
    }

    onUpVote = (postId) => {
        voteById(postId, OPTION_UP_VOTE)
            .then(result => {
                this._loadPosts();
            })
    }

    onDownVote = (postId) => {
        voteById(postId, OPTION_DOWN_VOTE)
            .then(result => {
                this._loadPosts();
            })
    }

    onFilterByCategory = (category) => {
        this.props.addFilterByCategory(category);
    }

    onClearFilterByCategory = () => {
        this.props.clearFilterByCategory();
    }

    onChangeSort = (event, index, value) => {
        this.props.changeSortBy(value);
    }

    onRefreshPosts = () => {
        this._loadPosts();
    }

    _loadPosts = () => {
        this.setState({loadPosts : true});
        getAllPosts()
            .then(posts => {
                posts.forEach(post => this.props.addPost(post));
                this.setState({loadPosts : false})
            });
    }

    _loadCategories = () => {
        this.setState({
            loadCategories : true
        });
        
        getAllCategories()
            .then(categories => categories.categories)
            .then(categories => { 
                categories.forEach(category => this.props.addCategory(category))
                this.setState({loadCategories : false})
            });
    }

    _showAlertIfExists = () => {
        const {alert, clearAlert} = this.props;
        if (!isEmpty(alert.alert)) {
            const {typeMessage, message, time} = alert.alert;
            this.msg.show(alert.alert.message, {
                time,
                message,
                type : typeMessage
            });
            clearAlert();
        }
    }

    render() {
        const {posts, categories, filter, alert} = this.props;
        const sortMode = getSortString(filter.sortBy);
        return (
           <Grid fluid style={{marginTop : '10px'}}>
                <Row>
                    <Col md={12} xs={12}>
                        <PostFilterBar selected={filter.sortBy} onChange={this.onChangeSort} onRefresh={this.onRefreshPosts}/>
                        <AlertContainer ref={a => this.msg = a} {...alert.options} />
                    </Col>
                </Row>
                
                <Row style={{marginTop : '10px'}}>
                    <Col md={9}>
                        {this.state.loadPosts && <LinearProgress mode="indeterminate" />}
                        {posts && Object
                            .keys(posts)
                            .map(key => posts[key])
                            .filter(post => {
                                if(!filter.category) return post
                                if (filter.category === post.category) return post;
                                return null;
                            })
                            .sort(sortBy(sortMode))
                            .map((post => {
                                return <PostItem key={post.id} post={post} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                            }))}
                    </Col>

                    <Col md={3}>
                        {this.state.loadCategories && <LinearProgress mode='indeterminate' />}
                        {categories && <FilterTags categories={categories} selected={filter.category} onFilter={this.onFilterByCategory} onClearFilter={this.onClearFilterByCategory} />}
                    </Col>
                </Row>
           </Grid>
        )
    }
}

const mapStateToProps = ({posts, categories, filter, alert}) => {
    const {list} = posts;
    return {
        posts : list,
        categories,
        filter,
        alert
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost : (data) => dispatch(addPost(data)),
        addCategory : (data) => dispatch(addCategory(data)),
        addFilterByCategory : (data) => dispatch(addFilterByCategory(data)),
        clearFilterByCategory : () => dispatch(clearFilterByCategory()),
        changeSortBy : (data) => dispatch(changeSortBy(data)),
        clearAlert : () => dispatch(clearAlert())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostListContainer);