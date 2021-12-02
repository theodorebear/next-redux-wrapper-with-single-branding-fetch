import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import {NextPageContext} from 'next';
import {State} from '../components/reducer';

export interface PageProps extends State {
    pageProp: string;
    appProp: string;
}

class Index extends React.Component<PageProps> {
    // note that since _app is wrapped no need to wrap page
    public static async getInitialProps({store, pathname, query, req}: NextPageContext) {
        //console.log('2. Page.getInitialProps uses the store to dispatch things', {pathname, query});
        console.log("home - getInitialProps store",Object.keys(store.getState()['app']))

        if (req) {
            // All async actions must be await'ed
            await store.dispatch({type: 'PAGE', payload: 'server'});

            // Some custom thing for this particular page
            return {pageProp: 'server'};
        }

        // await is not needed if action is synchronous
        store.dispatch({type: 'PAGE', payload: 'client'});

        // Some custom thing for this particular page
        return {pageProp: 'client'};
    }

    public render() {
        // console.log('5. Page.render');
        const {pageProp, appProp, app, page} = this.props;
        return (
            <div className="index">

                <img src={app.logo} />
                <div style={{background:app.color,padding:"6px"}}>Branding Color</div>

                <Link href="/page2">
                    <a>Page2</a>
                </Link>
            </div>
        );
    }
}

export default connect(state => state)(Index);
