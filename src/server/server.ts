import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as path from 'path';
import { IndexRoutes } from './routes/index';
import errorHandler = require('errorhandler');
import mongoose = require('mongoose');

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  private model: IModel; //an instance of IModel
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // instance defaults
    this.model = Object(); // initialize this to an empty object
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // empty for now
    console.log('Listen on port 3000');
    this.app.listen(process.env.PORT || 3000);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    const MONGODB_CONNECTION: string = 'mongodb://localhost:27017/chat-wall';

    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // mount logger
    this.app.use(logger('dev'));

    // mount json form parser
    this.app.use(bodyParser.json());

    // mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // mount override
    // this.app.use(methodOverride());

    // use q promises
    global.Promise = require('q').Promise;
    mongoose.Promise = global.Promise;

    // connect to mongoose
    const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    // create models
    // this.model.user = connection.model<IUserModel>('User', userSchema);

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    IndexRoutes.create(router);

    // use router middleware
    this.app.use(router);
  }

}
const server = Server.bootstrap();
