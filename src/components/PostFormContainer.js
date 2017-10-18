import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputText from './InputText';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';


class PostFormContainer extends Component {

    state = {
        title : "",
        author : ""
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <InputText name='title' id='title' hintText='Reading Title' labelText='Title' value={this.state.title} onChange={this.handleChange} />
                        <InputText name='author' id='author' hintText='Reading author' labelText='Author' value={this.state.author} onChange={this.handleChange} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default PostFormContainer;