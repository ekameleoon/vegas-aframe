"use strict" ;

import { BuildApplication }   from './process/application/BuildApplication.js' ;
import { InitApplication }    from './process/application/InitApplication.js' ;
import { PreloadApplication } from './process/application/PreloadApplication.js' ;

/**
 * The {@link example.process} package.
 * @summary The {@link example.process} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace example.process
 * @version 1.0.0
 * @since 1.0.0
 */
export var process = Object.assign
({
    BuildApplication   : BuildApplication,
    InitApplication    : InitApplication,
    PreloadApplication : PreloadApplication,
});