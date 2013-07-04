console.log("sidebar_example: parse");

openerp.sidebar_example = function(instance, m) {
    var _t = instance.web._t,
        QWeb = instance.web.qweb;

    console.log("sidebar_example: load");

    instance.web.Sidebar.include({
        redraw: function() {
            console.log("sidebar_example: redraw");

            var self = this;
            this._super.apply(this, arguments);

            self.$el.find('.oe_sidebar_add_attachment').after(QWeb.render('AddFooDocumentItem', {widget: self}))
            self.$el.find('.oe_sidebar_add_google_doc').on('click', function (e) {
                self.on_click();
            });
        },
        on_click: function() {
            console.log("sidebar_example: on_click");

            var self = this;
            var view = self.getParent();
            var ids = ( view.fields_view.type != "form" )? view.groups.get_selection().ids : [ view.datarecord.id ];
            if( !_.isEmpty(ids) ) {
                console.debug("ids: ", ids);
            }
        }
    });
};

