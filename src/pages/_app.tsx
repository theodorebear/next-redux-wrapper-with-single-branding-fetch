import React from 'react';
import App, {AppInitialProps, AppContext} from 'next/app';
import {wrapper} from '../components/store';
import { _brandingGet } from "../ajax/front";

class WrappedApp extends App<AppInitialProps> {
    public static getInitialProps = (context: any) =>
        wrapper.getInitialAppProps(store => async ({Component, ctx}: AppContext) => {

            const initRun = typeof window === "undefined" && !ctx.req?.url?.startsWith("/_next/data") && !ctx.req?.url?.startsWith("/_next/static") && !ctx.req?.url?.startsWith("/_next/webpack-hmr")

            console.log("App.getInitialProps running",{
                window_undefined: typeof window === "undefined",
                req_present: ctx.req ? 1 : 0,
                req_url: ctx.req?.url,
                init_run: initRun,
            })

            if(initRun) {

                // Will only run one time, ideally. (on the server, and only when not asking for /_next/data or /_next/static pages)
                // I used this filtering / logic thanks to the guys over at https://github.com/vercel/next.js/discussions/18210, they're as confused as I am but this appears to work.
                console.log("---")
                console.log("RUNNING INIT TO GET BRANDING, ONLY ONE TIME ON INITIAL LOAD OF APP")

                // Here's where we would await a fetch from the server, and it would give us the branding based on whichever domain name we are coming in on.
                //const {data} = await _brandingGet({domain: ctx.req.headers.host || "localhost"})

                // For testing purposes, we'll just mock the fetch and return a logo and colors.
                const data = {logo: "https://quicktours-static.s3.us-west-1.amazonaws.com/website_styling/20210802100554.jpg",color:"#c434ff"}

                await store.dispatch({type: 'APP', payload: data});

            }

            return {
                pageProps: {
                    // Call page-level getInitialProps manually, instead of App.getInitialProps
                    // Documentation: https://nextjs.org/docs/advanced-features/custom-app
                    ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
                    // Some custom thing for all pages
                    appProp: ctx.pathname,
                },
            };
        })(context);

    public render() {
        const {Component, pageProps} = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(WrappedApp);
