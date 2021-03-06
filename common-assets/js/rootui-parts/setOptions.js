import { $ } from './_utility';

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions( newOpts ) {
    const self = this;

    const optsTemplates = $.extend( {}, this.options.templates, ( newOpts && newOpts.templates ) || {} );
    const optsEvents = $.extend( {}, this.options.events, ( newOpts && newOpts.events ) || {} );

    self.options = $.extend( {}, self.options, newOpts );
    self.options.templates = optsTemplates;
    self.options.events = optsEvents;
}

export { setOptions };
