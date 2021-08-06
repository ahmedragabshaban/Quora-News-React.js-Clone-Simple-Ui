/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Label, Input,
} from 'reactstrap';
import { userStories } from "../../network/ApiAxios";

/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';
import FancyBox from '../../components/fancybox';
import Tabs from '../../components/tabs';
// import TextEditor from '../../components/text-editor';
{/* <TextEditor /> */ }

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            activeTab: 'activity',
            stories: [],
            storiesCount: 0,
        };

        this.toggleTab = this.toggleTab.bind( this );
    }

    toggleTab( name ) {
        this.setState( {
            activeTab: name,
        } );
    }

    async componentDidMount() {
        const response = await userStories( this.state.email, this.state.password );
        this.setState( {
            stories: response.data.rows,
            storiesCount: response.data.count,
        } );
        // eslint-disable-next-line no-console
        console.log( this.state.stories, response );
    }

    render() {
        const {
            activeTab,
        } = this.state;
        const defaultValue = { name: '', email: '' };
        let user = window.localStorage.getItem( 'user' );
        if ( user === null ) {
            user = defaultValue;
        } else {
            user = JSON.parse( user );
        }

        const { settings } = this.props;

        return (
            <Fragment>
                <div className="rui-profile row vertical-gap">
                    <div className="col-lg-6 col-xl-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row vertical-gap">
                                    <div className="col-auto">
                                        <div className="rui-profile-img">
                                            <img src={ settings.users[ 0 ].img_profile } alt="" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="rui-profile-info">
                                            <h3 className="rui-profile-info-title h4">{ user.name }</h3>
                                            <small className="text-grey-6 mt-2 mb-15">Story Writer</small>
                                            <Link className="rui-profile-info-mail" to="#">{ user.email }</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="rui-profile-numbers">
                                    <div className="row justify-content-center">
                                        <div className="col" />
                                        <div className="col-auto">
                                            <div className="rui-profile-number text-center">
                                                <h4 className="rui-profile-number-title h2">{ this.state.storiesCount }</h4>
                                                <small className="text-grey-6">Stories</small>
                                            </div>
                                        </div>

                                        <div className="col" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Fragment>

                    </Fragment>
                    <div className="col-12">
                        <div className="d-flex align-items-center">
                            <h2 className="card-title mnb-6 mr-auto">Current Stories</h2>
                            <button className="btn btn-custom-round mr-20" type="button">
                                <Icon name="link2" />
                            </button>
                            <Link className="rui-task-title" to="/task">
                                <button className="btn btn-brand btn-uniform btn-round btn-sm mnt-8 mnb-8" type="button">
                                    <Icon name="plus" />
                                </button></Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <Tabs sliding>
                            <Tabs.NavItem
                                isActive={ activeTab === 'activity' }
                                onClick={ () => this.toggleTab( 'activity' ) }
                            >
                                My Stories
                            </Tabs.NavItem>

                            <Tabs.NavItem
                                isActive={ activeTab === 'timeline' }
                                onClick={ () => this.toggleTab( 'timeline' ) }
                            >
                                Unpublished Stories
                            </Tabs.NavItem>

                            <Tabs.NavItem
                                isActive={ activeTab === 'settings' }
                                onClick={ () => this.toggleTab( 'settings' ) }
                            >
                                Settings
                            </Tabs.NavItem>
                        </Tabs>
                        <Tabs.Content activeTab={ activeTab }>
                            <Tabs.Pane tabId="activity">
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

                                                <small className="media-subtitle">{ data.body }</small>

                                            </div>
                                        </li> )

                                    ) )
                                    }

                                </ul>
                            </Tabs.Pane>
                            <Tabs.Pane tabId="timeline">
                                <ul className="list-group list-group-flush rui-profile-activity-list">
                                    { this.state.stories && this.state.stories.map( ( data, i ) => (
                                        ( data.status === 0 ) && ( <li className="list-group-item" key={ i } >
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

                                                <small className="media-subtitle">{ data.body }</small>

                                            </div>
                                        </li> )

                                    ) )
                                    }

                                </ul>
                            </Tabs.Pane>
                            <Tabs.Pane tabId="settings">
                                <form action="#">
                                    <div className="row vertical-gap">
                                        <div className="col-12 col-lg-auto">
                                            <div className="card">
                                                <div className="card-body pt-20 pr-10 pb-20 pl-10">
                                                    <ul className="nav flex-column mnt-3">
                                                        <li>
                                                            <Link className="nav-link active" to="#">
                                                                <Icon name="user" />
                                                                <span>Personal information</span>
                                                            </Link>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-8">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row vertical-gap sm-gap justify-content-end">
                                                        <div className="col-12">
                                                            <Label>Avatar</Label>
                                                            <Link className="rui-profile-img" to="#">
                                                                <img src={ settings.users[ 0 ].img_profile } alt="" />
                                                            </Link>
                                                        </div>
                                                        <div className="col-12">
                                                            <Label for="firstName">First Name</Label>
                                                            <Input className="form-control" type="text" id="firstName" aria-describedby="emailHelp" value="user" placeholder="Your First Name" onChange={ () => { } } />
                                                        </div>
                                                        <div className="col-12">
                                                            <Label for="lastName">Last Name</Label>
                                                            <Input type="email" className="form-control" id="lastName" aria-describedby="emailHelp" value="Boyd" placeholder="Your Last Name" onChange={ () => { } } />
                                                        </div>
                                                        <div className="col-12">
                                                            <Label for="profileEmail">Email</Label>
                                                            <Input type="email" className="form-control" id="profileEmail" aria-describedby="emailHelp" value="info@example.com" placeholder="Your Email" onChange={ () => { } } />
                                                        </div>
                                                        <div className="col-12">
                                                            <Label for="phone">Contact Phone</Label>
                                                            <Input className="form-control" type="text" id="phone" aria-describedby="emailHelp" value="+44 987 065 909" placeholder="Your Phone" onChange={ () => { } } />
                                                        </div>
                                                        <div className="col-auto">
                                                            <button className="btn btn-grey-2" type="button">Cancel</button>
                                                        </div>
                                                        <div className="col-auto">
                                                            <button className="btn btn-brand" type="button">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Tabs.Pane>
                        </Tabs.Content>
                    </div>
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
