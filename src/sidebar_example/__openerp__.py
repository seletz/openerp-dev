# -*- coding: utf-8 -*-
{
    'name': 'sidebar_example',
    'version': '0.1',
    'author': 'Stefan Eletzhofer <se@nexiles.de>',
    'website': 'http://nexiles.com',
    'category': 'Tools',
    'installable': True,
    'auto_install': True,
    'js': ['static/src/js/sidebar.js'],
    'qweb': ['static/src/xml/sidebar.xml'],
    'data': [
        'security/ir.model.access.csv',
        'res_config_user_view.xml'
    ],
    'depends': ['document'],
    'description': """
Test of Sidebar Actions
=======================
""",
}

