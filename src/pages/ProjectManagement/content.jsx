/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import classnames from 'classnames/dedupe';
// import {
//     TabContent, TabPane, Nav, NavItem, NavLink, Label, Input,
// } from 'reactstrap';
// import ReactSortable from 'react-sortablejs';

/**
 * Internal Dependencies
 */
// import Icon from '../../components/icon';

/**
 * Component
 */
class Content extends Component {
    componentDidMount() {
    }

    constructor( props ) {
        super( props );

        this.state = {
        };
        bind( this );
    }

    render() {
        const {

        } = this.state;

        return (
            <Fragment>
                <div className="row vertical-gap">

                </div>
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
