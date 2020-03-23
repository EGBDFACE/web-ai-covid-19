// use definePlugin(webpack) to use devtools only in dev
import { configureStore as configureStoreDev } from 'src/redux/configureStore.dev';
import { configureStore as configureStoreProd } from 'src/redux/configureStore.prod';

let configureStore:any = undefined;
if (process.env.NODE_ENV === 'production') {
    configureStore = configureStoreProd;
    // module.exports = require('./configureStore.prod');
} else if (process.env.NODE_ENV === 'development') {
    configureStore = configureStoreDev;
    // module.exports = require('./configureStore.dev');
} else {
    console.error('error in require configureStore');
}

// configureStore = configureStoreProd;
export default configureStore;