import logging

from openerp.osv import orm, fields


logger = logging.getLogger("web_example")

logger.info("logging works")

class Times(orm.Model):
    _name = 'web_example.stopwatch'

    _columns = {
        'time': fields.integer("Time", required=True,
                               help="Measured time in milliseconds"),
        'user_id': fields.many2one('res.users', "User", required=True,
                                   help="User who registered the measurement")
    }
