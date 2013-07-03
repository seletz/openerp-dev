# __openerp__.py
{
    'name': "web_example",
    'description': "Basic example of a (future) web module",
    'category': 'Hidden',
    'depends': ['web'],
    'data': ['web_example.xml'],
    'js': ['static/src/js/first_module.js'],
    'css': ['static/src/css/web_example.css'],
    'qweb': ['static/src/xml/web_example.xml'],
    'test': ['static/src/tests/timer.js'],
    'auto_install': True,
    'web_preload': False,
}
