/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';

/**
 * Component
 */
class ProjectManagementPage extends Component {
    render() {
        return (
            <PageWrap>
                <PageTitle
                    breadcrumbs={ {
                        '/': 'Home',
                        '/stories': {
                            title: 'Apps',
                            sub: 'apps',
                        },
                    } }
                >
                    <h1>Stories</h1>
                </PageTitle>
                <PageContent>
                    <AsyncComponent component={ () => import( './content' ) } />
                </PageContent>
            </PageWrap>
        );
    }
}

export default ProjectManagementPage;
