console.log('webpack');

// FAVICONS & IMAGES
require.context('./components', true, /^\.\//);
require.context('./favicons', true, /^\.\//);
require.context('./views', true, /^\.\//);
require.context('./images', true, /^\.\//);

// TEMPLATES
require.context('./', true, /\.html$/);
require.context('./reql-sales-page', true, /^\.\//);


//CSS & SCSS
require("!style!css!sass!./index.scss");

//JS NODE_MODULES
require('../node_modules/angular/angular.js')
require('../node_modules/angular-messages/angular-messages.js')
require('../node_modules/angular-ui-router/release/angular-ui-router.min.js')
require('../node_modules/angular-ui-bootstrap/index.js')

//JS APP SCRIPTS
require('./index.js')
require('./index.routes.js')

// JS COMPONENTS
require('./services/uuid.service.js');
require('./services/anon-id.service.js');
require('./services/segment.service.js');
require('./components/Footer/Footer.js');

//JS VIEW CONTROLLERS
require('./views/Utils/index.js')
require('./views/Rethink/index.js')
require('./views/RethinkSupport/index.js')