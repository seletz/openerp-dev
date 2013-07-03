===================
OpenERP Dev Install
===================

:Author:    Stefan Eletzhofer
:Date:      |today|

Abstract
========

Installation of a development environment for OpenERP

Prerequisites
=============

- PostgreSQL installed and reachable
- python 2.7.x

Installation Steps
==================

- review database settings
- make virtual env
- bootstrap
- run buildout
- start server

review database settings
------------------------

These settings in the `buildout.cfg` in the `openerp` path
need to be adjusted::

    options.db_host = localhost
    options.db_name = False
    options.db_user = seletz
    options.db_pass = False

virtualenv
----------

Make a virtualenv::

    $ mkvirtualenv openerp-dev
    $ workon openerp-dev
    $ mkdir openerp-dev
    $ cd openerp-dev
    $ setvirtualenvproject

bootstrap
---------

Run `bootstrap.py`::

    $ workon openerp-dev
    $ cd buildout
    $ python bootstrap.py

This will run some time.

Start server
------------

Fire the server up::

    $ workon openerp-dev
    $ cd buildout
    $ bin/start_openerp


.. vim: set ft=rst tw=75 nocin nosi ai sw=4 ts=4 expandtab:
