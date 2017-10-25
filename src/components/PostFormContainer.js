import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputText from './InputText';
import InputSelect from './InputSelect';
import {getAllCategories} from '../services/ApiService'
import RaisedButton from 'material-ui/RaisedButton';
import Validation from './validation/Validation'


const rules = {
    author : {
        isRequired : {
            value : true,
            message: "This field is required"
        },
        minLength : {
            value : 2,
            message: "The size must be min 2"
        },
        maxLength : {
            value : 100,
            message: "The size must be max 100."
        }
    },
    title : {
        isRequired : {
            value : true,
            message: "This field is required"
        },
        minLength : {
            value : 2,
            message: "The size must be min 2"
        },
        maxLength : {
            value : 150,
            message: "The size must be max 150."
        }
    },
    body : {
        isRequired : {
            value : true,
            message: "This field is required"
        },
        minLength : {
            value : 2,
            message: "The size must be min 2"
        },
        maxLength : {
            value : 255,
            message: "The size must be max 255."
        }
    },
    categorie : {
        isRequired : {
            value : true,
            message: "This field is required"
        }
    }
}

class PostFormContainer extends Component {

    state = {
        title : "",
        author : "",
        body : "",
        categorie : null,
        apiCategories : [],
        runValidate : false
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name] : value
        })
    }

    onSubmit = () => {
        this.setState({
            runValidate : true
        })
    }

    handleSelectInput = (event, index, value) => this.setState({categorie : value})

    componentDidMount() {
        getAllCategories()
            .then(result => this.setState({apiCategories : result.categories}));
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <form name='post' onSubmit={() => false}>
                            <Validation rules={rules} runValidate={this.state.runValidate}>
                                <InputText key='author' name='author' id='author' hintText='Reading author' labelText='Author' value={this.state.author} onChange={this.handleChange} />
                                <InputText key='title' name='title' id='title' hintText='Reading Title' labelText='Title' value={this.state.title} onChange={this.handleChange} />
                                <InputText key='body' multiline rows={5} name='body' id='body' hintText='Reading Body' labelText='Body' value={this.state.body} onChange={this.handleChange} />
                                <InputSelect key='categorie' categories={this.state.apiCategories} name='categorie' id='categorie' labelText="Categorie" value={this.state.categorie} onChange={this.handleSelectInput} />
                            </Validation>
                            <br /><br />
                            <RaisedButton label="Save!" secondary={false} backgroundColor='green' labelColor='#fff' onClick={this.onSubmit} />
                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default PostFormContainer;