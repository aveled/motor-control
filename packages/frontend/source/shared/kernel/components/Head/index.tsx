// #region imports
    // #region libraries
    import React from 'react';

    import {
        AnyAction,
        ThunkDispatch,
    } from '@reduxjs/toolkit';
    import { connect } from 'react-redux';

    import {
        Helmet,
    } from 'react-helmet-async';


    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        MotorisMergedConfiguration,
    } from '~shared/data/interfaces';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
export interface HeadOwnProperties {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogImage?: string;
    ogURL?: string;
    ogDescription?: string;
    canonicalURL?: string;
}

export interface HeadStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurationMeta: MotorisMergedConfiguration['meta'];
}

export interface HeadDispatchProperties {
}

export type HeadProperties =
    & HeadOwnProperties
    & HeadStateProperties
    & HeadDispatchProperties;


const Head: React.FC<HeadProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        title,
        description,
        ogTitle,
        ogImage,
        ogURL,
        ogDescription,
        canonicalURL,
        // #endregion own

        // #region state
        stateConfigurationMeta,
        // #endregion state
    } = properties;

    const titleValue = stateConfigurationMeta?.title || title || `Motor Control`;
    const descriptionValue = description || 'Motor Control';
    const ogTitleValue = ogTitle || title || `Motor Control`;
    const ogDescriptionValue = ogDescription || description || 'Motor Control';
    const ogImageValue = ogImage || '/icon-192x192.png';
    const ogURLValue = ogURL || '';

    const apiDomain = '';

    const favicon = stateConfigurationMeta?.favicon || '/favicon.ico';
    // #endregion properties


    // #region render
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="robots" content="index,follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <title>{titleValue}</title>
            <meta name="title" content={titleValue} />
            <meta name="description" content={descriptionValue} />

            <link rel="preconnect" href={apiDomain} />
            <link rel="dns-prefetch" href={apiDomain} />

            <link rel="icon" href={favicon} sizes="64x64" />
            <link rel="shortcut icon" type="image/png" href="/icon-192x192.png" />
            <link rel="shortcut icon" sizes="192x192" href="/icon-192x192.png" />
            <meta name="theme-color" content="#272A30" />

            <link rel="manifest" href="/manifest.json" />

            {canonicalURL && (
                <link rel="canonical" href={canonicalURL} />
            )}

            {/* OPEN GRAPH */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ogTitleValue} />
            <meta property="og:image" content={ogImageValue} />
            <meta property="og:site_name" content="plurid" />
            <meta property="og:url" content={ogURLValue} />
            <meta property="og:description" content={ogDescriptionValue} />

            {/* TWITTER */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={ogURLValue} />
            <meta property="twitter:title" content={ogTitleValue} />
            <meta property="twitter:description" content={ogDescriptionValue} />
            <meta property="twitter:image" content={ogImageValue} />

            {/* SAFARI */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={titleValue} />
            <link rel="apple-touch-icon" href="/icon-192x192.png" />

            {/* MICROSOFT */}
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#456c77" />
            <meta name="msapplication-TileColor" content="#ffffff" />
        </Helmet>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): HeadStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurationMeta: selectors.configuration.getConfiguration(state).meta,
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): HeadDispatchProperties => ({
});


const ConnectedHead = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Head);
// #endregion module



// #region exports
export default ConnectedHead;
// #endregion exports
