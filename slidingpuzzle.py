# encoding: utf-8
import cgi
import json
import logging
import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

import webapp2


class MainPage(webapp2.RequestHandler):
  def get(self):
    self.response.out.write(
      open(os.path.join(os.path.dirname(__file__), "index.html"), "r").read())

app = webapp2.WSGIApplication([("/", MainPage)])