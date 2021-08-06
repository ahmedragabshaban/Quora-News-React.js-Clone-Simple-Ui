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
import { FormGroup, Label, Input, Button } from 'reactstrap';
// import { FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input } from 'reactstrap';
/**
 * Component
 */
class Content extends Component {
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
                        />
                    </FormGroup>
                </div>

                <div className="row" style={ { width: '100%' } }>
                    <TextEditor />
                </div>

                <div style={ { float: 'right' } }>
                    <Button
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
                            Save
                        </span>
                    </Button>
                    <Button
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
                            Publish
                        </span>
                    </Button>

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
