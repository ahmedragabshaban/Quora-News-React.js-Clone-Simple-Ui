/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAll, upvoateStory } from "../../network/ApiAxios";

import { Link } from 'react-router-dom';
import FancyBox from '../../components/fancybox';
import { Button, Spinner } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            stories: [],
            storiesCount: 0,
        };
    }

    async componentDidMount() {
        const response = await getAll();
        this.setState( {
            stories: response.data.rows,
            storiesCount: response.data.count,
        } );
        // eslint-disable-next-line no-console
        console.log( this.state.stories, response );
    }

    async upvoateStory( id ) {
        this.setState( {
            loading: true,
        } );

        // eslint-disable-next-line no-console
        const res = await upvoateStory( id );
        // eslint-disable-next-line no-console
        if ( res ) {
            this.setState( {
                loading: false,
            } );
        }
    }
    render() {
        const { settings } = this.props;

        return (
            <Fragment>
                <div className="row ">
                    <ul className="list-group list-group-flush rui-profile-activity-list">

                        { this.state.stories && this.state.stories.map( ( data, i ) => (
                            ( data.status === 1 ) && ( <li className="list-group-item" key={ i } >
                                <div className="media media-retiring media-success">
                                    <Link to="#" className="media-link">
                                        <span className="media-img"><img src={ settings.users[ 0 ].img_profile } alt="" /></span>
                                        <span className="media-body">
                                            <span className="media-title">
                                                { data.title }
                                                <div className="media-time">{ new Date( data.createdAt ).toLocaleString() }</div>
                                            </span>
                                        </span>
                                    </Link>
                                    <div className="media-content">
                                        <div className="row vertical-gap sm-gap rui-gallery">

                                            <FancyBox
                                                tagName="a"
                                                className="rui-gallery-item"
                                                href={ data.image }
                                                closeExisting
                                                popupClassName="rui-popup"
                                                galleryId="profile-gallery"
                                            >
                                                <span className="rui-gallery-item-overlay rui-gallery-item-overlay-md">
                                                    <Icon name="maximize" />
                                                </span>
                                                <img src={ data.image } className="rui-img" alt="" />
                                            </FancyBox>

                                        </div>
                                    </div>
                                    <Link to="#" className="media-icon">

                                        <Icon name="x" />
                                    </Link>

                                    <small className="media-subtitle">
                                        { <div dangerouslySetInnerHTML={ { __html: data.body } } /> }
                                    </small>

                                </div>
                                <Button onClick={ () => this.upvoateStory( data.id ) }
                                    className="btn-long"
                                    color="brand"
                                    style={ { marginTop: 10 } }
                                >
                                    <span className="icon">
                                        <Icon
                                            name={ [
                                                'fas',
                                                'arrow-alt-circle-up',
                                            ] }
                                            vendor="fa"
                                        />
                                    </span>
                                    <span className="text">
                                        Upvote    { this.state.loading && this.state.status === 1 ? (
                                            <Spinner />
                                        ) : '' }
                                    </span>
                                </Button>
                            </li> )

                        ) )
                        }

                    </ul>
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
