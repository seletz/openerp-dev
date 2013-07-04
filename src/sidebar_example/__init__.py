# -*- coding: utf-8 -*-
import logging

from openerp.osv import fields, osv
from openerp.tools.translate import _

logger = logging.getLogger(__name__)

logger.info("logging works")

class config(osv.osv):
    _name = 'sidebar_example.config'
    _description = "Sidebar Example Config"

    _columns = {
        'some_value':    fields.char('some random value', size=64, help="a value",
                                     required=True),
        'another_value': fields.char('another value', size=64, help='choose a name',
                                     required=True),
    }

    _defaults = {
        'another_value': 'joe random',
    }


config()
