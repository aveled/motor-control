// #region imports
    // #region libraries
    import {
        Provider as ReduxProvider,
    } from 'react-redux';

    import PluridServer, {
        PluridServerMiddleware,
        PluridServerService,
        PluridServerPartialOptions,
        PluridServerTemplateConfiguration,
    } from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        MotorisConfiguration,
    } from '~shared/data/interfaces';

    import helmet from '~kernel-services/helmet';

    /** uncomment to use services */
    import reduxStore from '~kernel-services/state/store';
    import reduxContext from '~kernel-services/state/context';

    import {
        shell,
        routes,
        planes,
    } from '../shared';

    import {
        APPLICATION_ROOT,
        routerProperties,
    } from '~shared/data/constants';
    // #endregion external


    // #region internal
    import preserves from './preserves';

    import {
        setRouteHandlers,
        setPttpCors,
    } from './handlers';
    // #endregion internal
// #endregion imports



// #region module
/** ENVIRONMENT */
const watchMode = process.env.PLURID_WATCH_MODE === 'true';
const isProduction = process.env.ENV_MODE === 'production';
const buildDirectory = process.env.PLURID_BUILD_DIRECTORY || 'build';
const port = process.env.PORT || 63000;



/** CONSTANTS */
const openAtStart = false;

const quiet = false;
const debug = 'info';

const usePTTP = true;



/** Custom styles to be loaded into the template. */
const styles: string[] = [
    //
];


/** Express-like middleware. */
const middleware: PluridServerMiddleware[] = [
    //
];


/** Services to be used in the application. */
const services: PluridServerService[] = [
    /** uncomment to use services */
    {
        name: 'Redux',
        Provider: ReduxProvider,
        properties: {
            store: reduxStore({}),
            context: reduxContext,
        },
    },
];


const options: PluridServerPartialOptions = {
    buildDirectory,
    open: openAtStart,
    quiet,
    debug,
    serverName: 'MotorControl Frontend',
};

const template: PluridServerTemplateConfiguration = {
    root: APPLICATION_ROOT,
};



/** SERVER */
const generateServer = (
    configuration: MotorisConfiguration,
) => {
    if (typeof configuration.endpoint !== 'string') {
        throw 'MotorControl requires an endpoint';
    }


    const pluridServer = new PluridServer({
        helmet,
        shell,
        routerProperties,
        routes,
        planes,
        preserves: preserves(configuration),
        styles,
        middleware,
        services,
        options,
        template,
        usePTTP,
    });


    // handle non-GET or custom routes (such as API requests, or anything else)
    setRouteHandlers(pluridServer);

    // if using PTTP
    setPttpCors(pluridServer);

    pluridServer.start(port);

    return pluridServer;
}
// #endregion module



// #region exports
export default generateServer;
// #endregion exports
