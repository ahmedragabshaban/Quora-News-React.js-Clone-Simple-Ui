/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/icon';
/**
 * Internal Dependencies
 */
import TextEditor from '../../components/text-editor';
import { FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
// import { FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input } from 'reactstrap';
import { createStory } from "../../network/ApiAxios";

class Content extends Component {
    state = {
        title: '',
        body: '',
        status: 0,
    }

    async createStory( status ) {
        this.setState( {
            loading: true,
            status: status,
        } );
        // eslint-disable-next-line no-console
        const response = await createStory( this.state.title, this.state.body, status );
        const { res } = response;
        if ( res ) {
            // eslint-disable-next-line no-console
            console.log( res );
        } else {
            this.setState( {
                loading: true,
            } );
        }
    }

    titleHandleChange = ( e ) => {
        this.setState( { title: e.target.value } );
    }

    bodyHandleChange = ( e ) => {
        this.setState( { body: e } );
    }

    submit = () => {
        this.setState( { show: this.state.value } );
    }

    render() {
        // const { settings } = this.props;

        return (
            <Fragment>

                <div className="rui-task-send row" >

                    <FormGroup style={ { width: '100%' } }>
                        <Label for="text">
                            Title
                        </Label>
                        <Input
                            id="text"
                            name="text"
                            placeholder="Title"
                            type="text"
                            value={ this.state.title } onChange={ this.titleHandleChange } />
                    </FormGroup>
                </div>

                <div className="row" style={ { width: '100%' } }>
                    <TextEditor value={ this.state.body } onChange={ this.bodyHandleChange } />
                </div>

                <div style={ { float: 'right' } }>
                    <Button onClick={ () => this.createStory( 0 ) }
                        className="btn-long"
                        color="brand"
                    >
                        <span className="icon">
                            <Icon
                                name={ [
                                    'fas',
                                    'save',
                                ] }
                                vendor="fa"
                            /></span>
                        <span className="text">
                            Save    { this.state.loading && this.state.status === 0 ? (
                                <Spinner />
                            ) : '' }
                        </span>
                    </Button>
                    <Button onClick={ () => this.createStory( 1 ) }
                        className="btn-long"
                        color="brand"
                        style={ { marginLeft: 15 } }
                    >
                        <span className="icon">
                            <Icon
                                name={ [
                                    'fas',
                                    'bookmark',
                                ] }
                                vendor="fa"
                            />
                        </span>
                        <span className="text">
                            Publish    { this.state.loading && this.state.status === 1 ? (
                                <Spinner />
                            ) : '' }
                        </span>
                    </Button>
                    { /* <i class="fas fa-arrow-alt-circle-up"></i> */ }
                </div>

            </Fragment >
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
